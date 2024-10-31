import { NextFunction, Request, Response } from "express";
import { CreateOrder, SearchOrder, UpdateOrder } from "../Model/order-model";
import {OrderService} from "../Service/order-service"

export class OrderController {

    static async CreateOrder(req: Request,res: Response,next: NextFunction): Promise<any> {
        try {
            const orderRequest: CreateOrder = req.body as CreateOrder;
            const response = await OrderService.CreateOrder(orderRequest);
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e);
        }
    }

    static async UpdateOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const orderRequest: UpdateOrder = req.body as UpdateOrder;
            orderRequest.id = Number(req.params.id);
            const response = await OrderService.UpdateOrder(orderRequest);
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e);
        }
    }

    static async DeleteOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const response = await OrderService.DeleteOrder({id});
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e);
        }
    }

    static async GetAllOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const response = await OrderService.GetAllOrder();
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e);
        }
    }

    static async FilterOrder(req: Request,res: Response,next: NextFunction): Promise<any> {
        try {
            const start = req.query.start
            const end = req.query.end
            const filter: SearchOrder = {
                start: new Date(start as string),
                end: new Date(end as string)
            }
            const response = await OrderService.SearchOrder(filter);
            return res.status(200).json({ data: response });
        } catch (e) {
            next(e);
        }
    }

}