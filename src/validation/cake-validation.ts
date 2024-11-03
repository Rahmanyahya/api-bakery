import {ZodType,z} from "zod"

export class CakeValidation {

    static readonly CREATE_CAKE: ZodType = z.object({
        cake_name: z.string().min(1),
        cake_price: z.number().positive().min(1),
        best_before: z.date(),
        cake_flavour: z.string().min(1),
        cake_image: z.string().min(1),
    })

    static UPDATE_CAKE: ZodType = z.object({
        id: z.number().positive().min(1),
        cake_id: z.number().positive().min(1).optional(),
        cake_name: z.string().min(1).optional(),
        cake_price: z.number().positive().min(1).optional(),
        cake_flavour: z.string().min(1).optional(),
        cake_image: z.string().min(1).optional(),
    })

    static readonly SEARCH_CAKE: ZodType = z.object({
        keyword: z.string().min(1).max(100)
    })

    static readonly DELETE_CAKE: ZodType = z.object({
        cake_id: z.number().positive().min(1)
    })

}