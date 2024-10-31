import { NextFunction, Request, Response } from "express";
import { CreateCakeRequest, DeleteCake, SearchCake, UpdateCakeRequest } from "../Model/cake-model";
import { CakeService } from "../Service/cake-service";
import { deleteFile } from "../helper/delete-images";

export class CakeController {

    static async CreateCake(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const CreateCakeRequest: CreateCakeRequest = req.body as CreateCakeRequest;
            CreateCakeRequest.cake_image = String(req.file!.filename)
            const response = await CakeService.CreateCake(CreateCakeRequest)
            return res.status(200).json({ data: response });
        } catch (e) {
            req.file == undefined? next(e) : (
                deleteFile(req.file!.filename),
                next(e)
            )
        }
    }

    static async UpdateCake (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const UpdateCakeRequest: UpdateCakeRequest = req.body as UpdateCakeRequest
            UpdateCakeRequest.id = Number(req.params.id)
            UpdateCakeRequest.cake_image = req.file!.filename || ""
            const response = await CakeService.UpdateCake(UpdateCakeRequest)
            return res.status(200).json({ data: response });
        } catch (e) {
            req.file == undefined? next(e) : (
                deleteFile(req.file!.filename),
                next(e)
            )
        }
    }

    static async DeleteCake (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
           const cake_id = Number(req.params.id) 
           const response = await CakeService.DeleteCake({cake_id})
           return res.status(200).json({ data: response });
        } catch (e) {
            next(e)
        }
    }

    static async GetAllCake (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const response = await CakeService.GetAllCake()
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e)
        }
    }

    static async SearchCake (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const searchRequest: SearchCake = req.query as SearchCake
            const response = await CakeService.SearchCake(searchRequest)
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e)
        }
    }

}