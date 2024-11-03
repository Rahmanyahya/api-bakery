import { Composition } from "@prisma/client";
import { prisma } from "../app/database";

export type CompositionResponse = {
  material_name: string;
  quantity: number;
};

export type CreateComposition = {
  cake_id: number;
  material_id: number;
  quantity: number;
};

export type UpdateComposition = {
  id: number;
  cake_id: number;
  material_id: number;
  quantity: number;
} 

export type DeleteComposition = {
  id: number;
};

export type SearchComposition = {
  keyword: string;
};

export async function toCompositionResponse(
  composition: Composition,
) {
  const data = await prisma.composition.findFirst({
    where: { id: composition.id },
    include: { material: { select: { material_name: true } } , cake: {select: {cake_name: true}}},
  });
  return {
    cake_name: data!.cake.cake_name,
    material_name: data!.material.material_name,
    quantity: composition.quantity,
  };
}
