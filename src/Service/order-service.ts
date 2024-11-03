import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateOrder, DeleteOrder, OrderResponse, SearchOrder, toOrderResponse, UpdateOrder } from "../Model/order-model";
import { OrderValidation } from "../validation/order-validation";
import { Validation } from "../validation/validation";

export class OrderService {

    static async CreateOrder (req: CreateOrder): Promise<OrderResponse> {
        req.order_date = new Date(req.order_date)
        const userOrderRequest = Validation.validate(OrderValidation.CREATE_ORDER,req)
        const userOrder = await prisma.order.create({data: {
            order_date: userOrderRequest.order_date,
            user_id: userOrderRequest.user_id,
            status: userOrderRequest.status,
            detail_orders: {
                createMany: {
                    data: userOrderRequest.order_details
                }
            }
        }})
        return toOrderResponse(userOrder.id)
    }

    static async UpdateOrder(req: UpdateOrder): Promise<OrderResponse> {
        const userUpdateOrderRequest = Validation.validate(OrderValidation.UPDATE_ORDER, req);
    
        const isOrderExists = await prisma.order.findFirst({where: {id: userUpdateOrderRequest.id}, include: {detail_orders: true}});
        if (!isOrderExists) throw new ErrorHandler(404, "Order not found");
    
        // Mengatur nilai default dari yang ada
        userUpdateOrderRequest.order_date = userUpdateOrderRequest.order_date ?? isOrderExists.order_date;
        userUpdateOrderRequest.user_id = userUpdateOrderRequest.user_id ?? isOrderExists.user_id;
        userUpdateOrderRequest.status = userUpdateOrderRequest.status ?? isOrderExists.status;
    
        // Update order tanpa detail
        if (!userUpdateOrderRequest.order_details) {
            const newDataOrder = await prisma.order.update({
                where: {id: userUpdateOrderRequest.id},
                data: {
                    order_date: userUpdateOrderRequest.order_date,
                    user_id: userUpdateOrderRequest.user_id,
                    status: userUpdateOrderRequest.status
                }
            });
            return toOrderResponse(newDataOrder.id);
        }
    
        let newDataDeatilsOrder: any[] = [];
    
        // Update order dan proses detail order
        const newDataOrder = await prisma.order.update({
            where: {id: userUpdateOrderRequest.id},
            data: {
                order_date: userUpdateOrderRequest.order_date,
                user_id: userUpdateOrderRequest.user_id,
                status: userUpdateOrderRequest.status
            }
        });
    
        for (let i = 0; i < userUpdateOrderRequest.order_details.length; i++) {
            const cake = await prisma.cake.findFirst({where: {id: userUpdateOrderRequest.order_details[i].cake_id}});
            if (!cake) throw new ErrorHandler(404, "Cake not found");
    
            // Pengecekan apakah kue sudah ada di order
            const isCakeIdAdded = newDataDeatilsOrder.find(item => item.cake_id == cake.id);
            if (isCakeIdAdded) throw new ErrorHandler(401, "You have added the same cake");
    
            newDataDeatilsOrder.push({
                order_id: newDataOrder.id,
                cake_id: userUpdateOrderRequest.order_details[i].cake_id,
                quantity: userUpdateOrderRequest.order_details[i].quantity
            });
        }
    
        // Hapus detail order lama dan tambahkan yang baru
        await prisma.detailOrder.deleteMany({where: {order_id: userUpdateOrderRequest.id}});
        if (newDataDeatilsOrder.length > 0) {
            await prisma.detailOrder.createMany({data: newDataDeatilsOrder});
        }
    
        return toOrderResponse(userUpdateOrderRequest.id);
    }
    
    

    static async DeleteOrder (req: DeleteOrder) {
        const userDeleteOrderRequest = Validation.validate(OrderValidation.DELETE_ORDER,req)
        
        const isOrderExist = await prisma.order.findFirst({where: {id: userDeleteOrderRequest.id}})
        if (!isOrderExist) throw new ErrorHandler(404, "Order not found")

        await prisma.detailOrder.deleteMany({where: {order_id: userDeleteOrderRequest.id}})
        await prisma.order.delete({where: {id: userDeleteOrderRequest.id}})

        return "OK"
    }

    static async GetAllOrder (): Promise<OrderResponse[] | Error> {
        const orders = await prisma.order.findMany({include: {detail_orders: {select: {cake: {select: {cake_name: true,cake_price: true,cake_flavour: true}}, quantity: true}}}})
        if (orders.length == 0) throw new ErrorHandler(404, "Order not found")
            
        return await Promise.all(orders.map(item => toOrderResponse(item.id)))
    }

    static async SearchOrder (req: SearchOrder): Promise<OrderResponse[] | Error> {
        const searchRequest = Validation.validate(OrderValidation.SEARCH_ORDER, req)
        console.log(searchRequest)
        const result = await prisma.order.findMany({where: {order_date: {
            gte: searchRequest.start,
            lte: searchRequest.end
        }}, include: {detail_orders: {select: {cake: {select: {cake_name: true,cake_price: true,cake_flavour: true}}, quantity: true}}}})
        if (result.length == 0) throw new ErrorHandler(404, "Order not found")
        return await Promise.all(result.map(item => toOrderResponse(item.id)))
    }

}