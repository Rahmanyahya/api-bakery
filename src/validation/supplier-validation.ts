import { ZodType, z } from "zod";

export class SupplierValidation {
    static readonly CREATE_SUPPLIER: ZodType = z.object({
        supplier_name: z.string().min(1).max(100),
        supplier_email: z.string().email().min(1).max(100),
        supplier_phone: z.string().min(1).max(100),
    })

    static readonly UPDATE_SUPPLIER: ZodType = z.object({
        supplier_name: z.string().min(1).max(100).optional(),
        supplier_email: z.string().email().min(1).max(100).optional(),
        supplier_phone: z.string().min(1).max(100).optional(),
    })

    static readonly SEARCH_SUPPLIER: ZodType = z.object({
        keyword: z.string().min(1).max(100)
    })

    static readonly DELETE_SUPPLIER: ZodType = z.object({
        id: z.number().positive(),
    })
}