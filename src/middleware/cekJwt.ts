import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../error/response-error';
import jwt from 'jsonwebtoken';
import "dotenv/config"

export class checkJWT {
    static forAdmin(req: Request, res: Response, next: NextFunction) {
        let token = req.headers.authorization;
        if (!token) return next(new ErrorHandler(403, "Unauthorized access"));
        
        token = token.split(" ")[1];

        jwt.verify(token, process.env.Secret_Token!, (err, result) => {
            if (err || result !== "Admin") return next(new ErrorHandler(403, "Unauthorized access"));
            next();
        });
    }

    static forCashier(req: Request, res: Response, next: NextFunction) {
        let token = req.headers.authorization;
        if (!token) return next(new ErrorHandler(403, "Unauthorized access"));
        
        token = token.split(" ")[1];

        jwt.verify(token, process.env.Secret_Token!, (err, result) => {
            if (err || result !== "Cashier") return next(new ErrorHandler(403, "Unauthorized access"));
            next();
        });
    }
}
