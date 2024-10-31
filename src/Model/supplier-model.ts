import { Supplier } from "@prisma/client"

export type CreateSupplier = {
    supplier_name: string
    supplier_address: string
    supplier_phone: string
}

export type SupplierResponse = {
    id: number
    supplier_name: string
    supplier_address: string
    supplier_phone: string
}

export type UpdateSupplier = {
    id: number
    supplier_name?: string
    supplier_address?: string
    supplier_phone?: string
}

export type SearchSupplier = {
    keyword: string
}

export type DeleteSupplier = {
    id: number
}

export function toSupplierResponse (supplier: Supplier) {
    return {
        id: supplier.id,
        supplier_name: supplier.supplier_name,
        supplier_address: supplier.supplier_address,
        supplier_phone: supplier.supplier_phone,
    }
}