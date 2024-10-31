import { role } from "@prisma/client";
import { ZodType, z } from "zod";

export class UserValidation {

    static readonly CREATE_USER: ZodType =  z.object({
        user_name: z.string().min(1).max(100),
        user_email: z.string().email().min(1).max(100),
        user_password: z.string().min(8).max(100),
        user_role: z.enum([role.admin, role.cashier]) 
    })

    static readonly UPDATE_USER: ZodType =  z.object({
        id: z.number().positive().min(1),
        user_name: z.string().min(1).max(100).optional(),
        user_email: z.string().email().min(1).max(100).optional(),
        user_password: z.string().min(8).max(100).optional(),
        user_role: z.enum([role.admin, role.cashier]).optional() 
    })

    static readonly SEARCH_USER: ZodType = z.object({
        keyword: z.string().min(1).max(100),
    })

    static readonly DELETE_USER: ZodType = z.object({
        id: z.number().positive().min(1)
    })

}