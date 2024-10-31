import { prisma } from "../app/database"
import { CreateDetailsSupply, DetailSupplyResponse, UpdateDetailsSupply } from "./detail-supply-model"

export type CreateSupply = {
    supply_date: Date
    supplier_id: number
    user_id: number
    detail_supply: CreateDetailsSupply[]
}

export type UpdateSupply = {
    id: number
    supply_date?: Date
    supplier_id?: number
    user_id?: number
    detail_supply: UpdateDetailsSupply[]
}

export type DeleteSupply = {
    id: number
}

export type SearchSupplly = {
    keyword: string
}

export type SupplyResponse = {
    id: number
    supply_date: Date
    supplier_name: string
    user_name: string
    detail_supply: DetailSupplyResponse[]
    total_price: number
}

export async function toSupplyResponse (id: number) {
    const supplys = await prisma.supply.findFirst({where: {id}, include: {supplier: {select: {supplier_name: true}}, user: {select: {user_name: true}}, detail_supplies: {include: {material: {select: {material_name:true, material_price: true, material_type: true}}}}}})
    const totalPrice = supplys!.detail_supplies.reduce((total, item) => {
            return total + (item.material.material_price * item.quantity);
        }, 0);
    
    const response = {
        id: supplys!.id,
        supply_date: supplys!.supply_date,
        supplier_name: supplys!.supplier.supplier_name,
        user_name: supplys!.user.user_name,
        detail_supply: supplys!.detail_supplies.map(item => ({
            material_name: item.material.material_name,
            material_price: item.material.material_price,
            quantity: item.quantity
        })),
        total_price: totalPrice
    }

    return response
}