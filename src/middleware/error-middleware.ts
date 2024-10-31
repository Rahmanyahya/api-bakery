import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorHandler } from "../error/response-error";

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        const messages = err.errors.map(issue => issue.message);
        res.status(400).json({
            errors: messages 
        });
    } else if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            errors: err.message
        });
    } else {
        res.status(500).json({
            errors: err.message 
        });
    }
    next();
};
