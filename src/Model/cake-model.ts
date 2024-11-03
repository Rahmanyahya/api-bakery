import { Cake } from "@prisma/client"
import { CompositionResponse } from "./compotition-model"
import { prisma } from "../app/database"

export type CreateCakeRequest = {
    cake_name: string,
    cake_price: number,
    cake_flavour: string,
    cake_image: string,
    best_before: Date
}

export type UpdateCakeRequest = {
    id: number
    cake_name: string,
    cake_price: number,
    cake_flavour: string,
    cake_image: string | undefined,
    best_before: Date
} 

export type DeleteCake = {
    cake_id: number
}

export type SearchCake = {
    keyword: string
}

export type CreateCakeResponse = {
    cake_name: string,
    cake_price: number,
    cake_flavour: string,
    cake_image: string,
    best_before: Date,
}

export type CakeResponse = {
    cake_name: string,
    cake_price: number,
    cake_flavour: string,
    cake_image: string,
    best_before: Date,
    compositions: CompositionResponse[]
}

export async function toCakeResponseWithComposition(cake: Cake) {
    const compositions = await prisma.composition.findMany({
        where: { cake_id: cake.id },
        include: { material: { select: { material_name: true } } }
    });

    return {
        id: cake.id,
        cake_name: cake.cake_name,
        cake_price: cake.cake_price,
        cake_flavour: cake.cake_flavour,
        cake_image: cake.cake_image,
        best_before: cake.best_before,
        compositions: compositions.map(item => ({
            material_name: item.material.material_name,
            quantity: item.quantity
        }))
    };
}


export async function toCakeResponse(cake: Cake) {
    return {
        cake_name: cake.cake_name,
        cake_price: cake.cake_price,
        cake_flavour: cake.cake_flavour,
        cake_image: cake.cake_image,
        best_before: cake.best_before
    }
}