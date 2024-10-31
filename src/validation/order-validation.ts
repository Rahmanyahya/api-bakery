import { start } from "repl"
import {ZodType, z} from "zod"

export class OrderValidation {

    static readonly CreateDetailOrder: ZodType = z.object({
        order_id: z.number().positive().min(1),
        cake_id: z.number().positive().min(1),
        quantity: z.number().positive().min(1),
    })

    static readonly UpdateDetailOrder: ZodType = z.object({
        order_id: z.number().positive().min(1).optional(),
        cake_id: z.number().positive().min(1).optional(),
        quantity: z.number().positive().min(1).optional(),
    })

    static readonly CREATE_ORDER: ZodType = z.object({
        order_date: z.date(),
        user_id: z.number().positive().min(1),
        status: z.enum(["process","delivered"]),
        detail_orders: z.array(this.CreateDetailOrder).min(1)
    })

    static readonly UPDATE_ORDER: ZodType = z.object({
        order_id: z.number().positive().min(1).optional(),
        order_date: z.date().optional(),
        user_id: z.number().positive().min(1).optional(),
        status: z.enum(["process","delivered"]).optional(),
        detail_orders: z.array(this.UpdateDetailOrder).min(1)
    })

    static readonly SEARCH_ORDER: ZodType = z.object({
       start: z.date(),
       end: z.date()
    })

    static readonly DELETE_ORDER: ZodType = z.object({
        order_id: z.number().positive().min(1),
    })

}