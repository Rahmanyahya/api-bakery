import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../error/response-error';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { CustomRequest } from '../config/config';

interface User {
    user_name: string;
    user_role: string;
}

export class checkJWT {
    
    static forAdmin(req: CustomRequest, res: Response, next: NextFunction): void {
        let token = req.headers.authorization;
        if (!token) return next(new ErrorHandler(403, "Unauthorized access"));
        
        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET!, (err, result) => {
            if (err) return next(new ErrorHandler(403, "Unauthorized access"));

            req.user = result as User; // pastikan hasil decode sesuai dengan User
            if (req.user.user_role !== "admin") return next(new ErrorHandler(403, "Unauthorized access"));
            
            next();
        });
    }

    static forCashier(req: CustomRequest, res: Response, next: NextFunction): void {
        let token = req.headers.authorization;
        if (!token) return next(new ErrorHandler(403, "Unauthorized access"));
        
        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET!, (err, result) => {
            if (err) return next(new ErrorHandler(403, "Unauthorized access"));

            req.user = result as User; // pastikan hasil decode sesuai dengan User
            if (req.user.user_role !== "cashier") return next(new ErrorHandler(403, "Unauthorized access"));
            
            next();
        });
    }
}
