import { Material, material_type } from "@prisma/client"

export type CreateMaterial = {
    material_name: string
    material_price: number
    material_type: material_type
}

export type UpdateMaterial = {
    id: number
    material_name?: string
    material_price?: number
    material_type?: material_type
}

export type SearchMaterial = {
    keyword: string
}

export type DeleteMaterial = {
    id: number
}

export type MaterialResponse = {
    id: number
    material_name: string
    material_price: number
    material_type: material_type
}

export function toMaterialResponse(material: Material) {
    return {
        id: material.id,
        material_name: material.material_name,
        material_price: material.material_price,
        material_type: material.material_type,
    }
}