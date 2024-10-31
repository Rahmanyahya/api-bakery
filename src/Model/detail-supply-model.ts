export type CreateDetailsSupply = {
    supply_id: number,
    material_id: number,
    material_price: number,
    quantity: number
}

export type UpdateDetailsSupply = {
    supply_id?: number,
    material_id?: number,
    material_price?: number,
    quantity?: number
} 

export type DetailSupplyResponse = {
    material_name: string
    material_price: number,
    quantity: number
}