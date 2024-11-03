import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, SearchUser, UpdateUserRequest} from "../Model/user-model";
import { UserService } from "../Service/user-service";

export class UserController {

    static async CreateUser (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const UserRequest: CreateUserRequest = req.body as CreateUserRequest
            const response = await UserService.CreateUser(UserRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async UpdateUser (req: Request, res: Response, next: NextFunction): Promise<any> {
        try { 
            const UserRequest: UpdateUserRequest = req.body as UpdateUserRequest
            UserRequest.id = Number(req.params.id)
            const response = await UserService.UpdateUser(UserRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async DeleteUser (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id)
            const response = await UserService.DeleteUser({id})
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async GetAllUser (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const response = await UserService.GetAllUser()
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    static async SearchUsers (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const keyword: SearchUser = req.query as SearchUser
            const response = await UserService.SearchUsers(keyword)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }
   
}