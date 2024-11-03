import { material_type } from "@prisma/client";
import { ZodType, z } from "zod";

export class MaterialValidation {
    static readonly CREATE_MATERIAL: ZodType = z.object({
        material_name: z.string().min(1).max(100),
        material_price: z.number().positive(),
        material_type: z.enum(["liquid", "powder", "solid"]),
    })

    static readonly UPDATE_MATERIAL: ZodType = z.object({
        id: z.number().positive().min(1),
        material_name: z.string().min(1).max(100).optional(),
        material_price: z.number().positive().optional(),
        material_type: z.enum(["liquid", "powder", "solid"]).optional(),
    })

    static readonly DELETE_MATERIAL: ZodType = z.object({
        id: z.number().positive().min(1),
    })
    
    static readonly SEARCH_MATERIAL: ZodType = z.object({
        keyword: z.string().min(1).max(100),
    })
}