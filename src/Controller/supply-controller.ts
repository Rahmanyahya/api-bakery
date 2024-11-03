import { Request, Response, NextFunction } from "express";
import { CreateSupply, SearchSupplly, UpdateSupply } from "../Model/supply-model";
import { SupplyService } from "../Service/supply-service";

export class SupplyController {

   static async CreateSupply (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const SupplyRequest: CreateSupply = req.body as CreateSupply
        const response = await SupplyService.CreateSupply(SupplyRequest)
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }

   static async UpdateSupply (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const SupplyRequest: UpdateSupply = req.body as UpdateSupply
        SupplyRequest.id = Number(req.params.id)
        const response = await SupplyService.UpdateSupply(SupplyRequest)
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }

   static async DeleteSupply (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const id = Number(req.params.id)
        const response = await SupplyService.DeleteSupply({id})
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }

   static async SearchSupply (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const keyword: SearchSupplly = req.query as SearchSupplly
        const response = await SupplyService.SearchProduct(keyword)
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }

   static async getAllSupply (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const response = await SupplyService.getAllSupply()
        return res.status(200).json({data: response})
    } catch (e) {
        next(e)
    }
   }

}