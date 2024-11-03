import { ZodType, z } from "zod";

export class CompesitionValidation {
  static readonly CREATE_COMPESITION: ZodType = z.object({
    cake_id: z.number().min(1).positive(),
    material_id: z.number().min(1).positive(),
    quantity: z.number().min(1).positive(),
  });

  static readonly UPDATE_COMPESITION: ZodType = z.object({
    id: z.number().min(1).positive(),
    material_id: z.number().min(1).positive().optional(),
    quantity: z.number().min(1).positive().optional(),
  });

  static readonly DELETE_COMPESITION: ZodType = z.object({
    id: z.number().min(1).positive(),
  });

  static readonly SEARCH_COMPESITION: ZodType = z.object({
    keyword: z.string().min(1),
  });
}
