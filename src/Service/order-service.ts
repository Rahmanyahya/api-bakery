import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateOrder, DeleteOrder, OrderResponse, SearchOrder, toOrderResponse, UpdateOrder } from "../Model/order-model";
import { OrderValidation } from "../validation/order-validation";
import { Validation } from "../validation/validation";

export class OrderService {

    static async CreateOrder (req: CreateOrder): Promise<OrderResponse> {
       
        const userOrderRequest = Validation.validate(OrderValidation.CREATE_ORDER,req)
        const userOrder = await prisma.order.create({data: userOrderRequest})
        return toOrderResponse(userOrder.id)
    }

    static async UpdateOrder (req: UpdateOrder): Promise<OrderResponse> {
        const newCake: number[] = []
        const newQuantity: number[] = []

        const userUpdateOrderRequest = Validation.validate(OrderValidation.UPDATE_ORDER, req)
        const isOrderExist = await prisma.order.findFirst({where: {id: userUpdateOrderRequest.id}, include: {detail_orders: true}})
        if (!isOrderExist) throw new ErrorHandler(404, "Order not found")

        userUpdateOrderRequest.order_date = userUpdateOrderRequest.order_date || isOrderExist.order_date
        userUpdateOrderRequest.user_id = userUpdateOrderRequest.user_id || isOrderExist.user_id
        userUpdateOrderRequest.status = userUpdateOrderRequest.status || isOrderExist.status
        await Promise.all(
            userUpdateOrderRequest.order_details.map(async (item) => {

                const isCakeExist = await prisma.cake.findFirst({where: {id: item.cake_id}})
                if (!isCakeExist) throw new ErrorHandler(404, "Cake not found")
    
                isOrderExist.detail_orders.map(oldItem => {
                   newCake.push(item.cake_id || oldItem.cake_id)
                 newQuantity.push(item.quantity || oldItem.quantity)
            })
        })
    )

    await prisma.order.update({where: {id: isOrderExist.id}, data: userUpdateOrderRequest})
    await prisma.detailOrder.deleteMany({where: {order_id: isOrderExist.id}})

        newCake.forEach(async (item,index) => (
            await prisma.detailOrder.create({data: {order_id: isOrderExist.id, cake_id: item, quantity: newQuantity[index]}})
        ))
    
    
    return toOrderResponse(isOrderExist.id)


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
        return orders.length > 0? await Promise.all(orders.map(item => toOrderResponse(item.id)))  : new ErrorHandler(404,"order not found")
    }

    static async SearchOrder (req: SearchOrder): Promise<OrderResponse[] | Error> {
        const searchRequest = Validation.validate(OrderValidation.SEARCH_ORDER, req)
        const result = await prisma.order.findMany({where: {order_date: {
            gte: searchRequest.start,
            lte: searchRequest.end
        }}, include: {detail_orders: {select: {cake: {select: {cake_name: true,cake_price: true,cake_flavour: true}}, quantity: true}}}})
        return result.length > 0? await Promise.all(result.map(item => toOrderResponse(item.id))) : new ErrorHandler(404, "order not found")
    }

}