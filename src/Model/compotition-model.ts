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
} & Partial<CreateComposition>;

export type DeleteComposition = {
  id: number;
};

export type SearchComposition = {
  keywoard: string;
};

export async function toCompositionResponse(
  composition: Composition,
): Promise<CompositionResponse> {
  const data = await prisma.composition.findFirst({
    where: { id: composition.id },
    include: { material: { select: { material_name: true } } },
  });
  return {
    material_name: data!.material.material_name,
    quantity: composition.quantity,
  };
}
