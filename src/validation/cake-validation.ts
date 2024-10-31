import {ZodType,z} from "zod"

export class CakeValidation {

    static readonly CREATE_CAKE_COMPOSITION: ZodType = z.object({
        cake_id: z.number().positive().min(1),
        material_id: z.number().positive().min(1),
        quantity: z.number().positive().min(1)
    })

    static readonly UPDATE_CAKE_COMPOSITION: ZodType = z.object({
        cake_id: z.number().positive().min(1).optional(),
        material_id: z.number().positive().min(1).optional(),
        quantity: z.number().positive().min(1).optional()
    })

    static readonly CREATE_CAKE: ZodType = z.object({
        cake_name: z.string().min(1),
        cake_price: z.number().positive().min(1),
        cake_flavour: z.string().min(1),
        cake_image: z.string().min(1),
        cake_description: z.string().min(1),
        cake_composition: z.array(CakeValidation.CREATE_CAKE_COMPOSITION).min(1),
    })

    static UPDATE_CAKE: ZodType = z.object({
        cake_id: z.number().positive().min(1).optional(),
        cake_name: z.string().min(1).optional(),
        cake_price: z.number().positive().min(1).optional(),
        cake_flavour: z.string().min(1).optional(),
        cake_image: z.string().min(1).optional(),
        cake_description: z.string().min(1).optional(),
        cake_composition: z.array(CakeValidation.UPDATE_CAKE_COMPOSITION).optional(),
    })

    static readonly SEARCH_CAKE: ZodType = z.object({
        keyword: z.string().min(1).max(100)
    })

    static readonly DELETE_CAKE: ZodType = z.object({
        cake_id: z.number().positive().min(1)
    })

}