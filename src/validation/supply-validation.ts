import { z, ZodType } from "zod";

export class SupplyValidation {

    static readonly CREATE_DETAIL_SUPPLY: ZodType = z.object({
        material_id: z.number().positive().min(1),
        quantity: z.number().positive().min(1)
    })

    static readonly UPDATE_DETAIL_SUPPLY: ZodType = z.object({
        material_id: z.number().positive().min(1).optional(),
        quantity: z.number().positive().min(1).optional()
    })

    static readonly CREATE_SUPPLY: ZodType = z.object({
        supply_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format"
        }).transform((date) => new Date(date)),
        supplier_id: z.number().positive().min(1),
        user_id: z.number().positive().min(1),
        detail_supply: z.array(SupplyValidation.CREATE_DETAIL_SUPPLY).min(1)
    })

    static readonly UPDATE_SUPPLY: ZodType = z.object({
        id: z.number().positive().min(1),
        supply_date: z.date().optional(),
        supplier_id: z.number().positive().min(1).optional(),
        user_id: z.number().positive().min(1).optional(),
        detail_supply: z.array(SupplyValidation.CREATE_DETAIL_SUPPLY).optional()
    })

    static readonly SEARCH_SUPPLY: ZodType = z.object({
        keyword: z.string().min(1).max(100)
    })

    static readonly DELETE_SUPPLY: ZodType = z.object({
        id: z.number().positive().min(1)
    })
    
}