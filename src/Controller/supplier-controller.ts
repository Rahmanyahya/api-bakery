import { NextFunction, Request, Response } from "express";
import { CreateSupplier, SearchSupplier, UpdateSupplier } from "../Model/supplier-model";
import { SupplierService } from "../Service/supplier-service";

export class SupplierController {
    static async CreateSupplier (req: Request,res: Response,next: NextFunction): Promise<any> {
        try {
            const supplierRequest: CreateSupplier = req.body as CreateSupplier
            const response = await SupplierService.CreateSupplier(supplierRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async UpdateSupplier (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const supplierRequest: UpdateSupplier = req.body as UpdateSupplier
            supplierRequest.id = Number(req.params.id)
            const response = await SupplierService.UpdateSupplier(supplierRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async DeleteSupplier (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id)
            const response = await SupplierService.DeleteSupplier({id})
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async GetAllSupplier (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const response = await SupplierService.GetAllSupplier()
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

   static async SearchSupplier (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const keyword: SearchSupplier = req.query as SearchSupplier
        const response = await SupplierService.SearchSupplier(keyword)
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }
    

}