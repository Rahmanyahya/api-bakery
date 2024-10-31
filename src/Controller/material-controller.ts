import { NextFunction, Request, Response } from "express";
import { CreateMaterial, DeleteMaterial, SearchMaterial, UpdateMaterial } from "../Model/material-model";
import { MaterialService } from "../Service/material-service";

export class MaterialController {

    static async CreateMaterial (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const MaterialRequest: CreateMaterial = req.body as CreateMaterial
            const response = await MaterialService.CreateMaterial(MaterialRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async UpdateMaterial (req: Request,res: Response, next: NextFunction): Promise<any> {
        try {
            const UpdateMaterialRequest: UpdateMaterial = req.body as UpdateMaterial
            UpdateMaterialRequest.id = Number(req.params.id)
            const response = await MaterialService.UpdateMaterial(UpdateMaterialRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async DeleteMaterial (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id)
            const response = await MaterialService.DeleteMaterial({id})
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async SearchMaterial (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const searchRequest: SearchMaterial = req.query as SearchMaterial
            const response = await MaterialService.SearchMaterial(searchRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }   
    }

    static async GetAllMaterials (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const response = await MaterialService.GetAllMaterials()
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }
}