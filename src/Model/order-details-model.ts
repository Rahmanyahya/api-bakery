export type CreateOrderDetails = {
    cake_id: number,
    quantity: number,
}

export type UpdateOrderDetails = {
    order_id?: number,
    cake_id?: number,
    quantity?: number,
}

export type OrderDetailsResponse = {
    cake_name: string
    cake_price: number
    cake_flavour: string,
    cake_image: string,
    quantity: number
}