import { status } from "@prisma/client"
import { CreateOrderDetails, OrderDetailsResponse, UpdateOrderDetails } from "./order-details-model"
import { prisma } from "../app/database"

export type CreateOrder = {
    order_date: Date
    user_id: number
    status: status
    order_details: CreateOrderDetails[]
}

export type UpdateOrder = {
    id: number,
    order_date?: Date
    user_id?: number
    status?: status
    order_details: UpdateOrderDetails[]
}

export type DeleteOrder = {
    id: number
}

export type SearchOrder = {
    start: Date,
    end: Date
}

export type OrderResponse = {
    order_date: Date
    user_name: string
    status: status
    order_details: OrderDetailsResponse[],
    total: number
}

export async function toOrderResponse(id: number) {
    const orders = await prisma.order.findFirst({where: {id}, include: {user: {select: {user_name: true}}, detail_orders: {include: {cake: {select: {cake_name: true,cake_flavour: true, cake_image: true, cake_price:true}}}}}}) 

    const total =  orders!.detail_orders.reduce((total, item) => {
        return total + (item.quantity * item.cake.cake_price)
    },0)

    return {
        id: orders!.id,
        order_date: orders!.order_date,
        user_name: orders!.user.user_name,
        status: orders!.status,
        order_details: orders!.detail_orders.map(item => ({
            cake_name: item.cake.cake_name,
            cake_price: item.cake.cake_price,
            cake_flavour: item.cake.cake_flavour,
            cake_image: item.cake.cake_image,
            quantity: item.quantity
        })),
        total
    }
} 
