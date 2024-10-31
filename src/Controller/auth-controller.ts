import { NextFunction, Request, Response } from "express";
import { LoginRequest } from "../Model/login-model";
import { AuthService } from "../Service/auth-service";

export class AuthController {

    static async Login (req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const UserLoginRequest: LoginRequest = req.body as LoginRequest
            const response = await AuthService.Login(UserLoginRequest)
            return res.status(200).json({data: response})
        } catch (e) {
            next(e)
        }
    }

    
}