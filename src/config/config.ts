import { Request } from "express";
import path from "path";

export interface CustomRequest extends Request {
    user?: {
        user_name: string;
        user_role: string;
    };
}


export const root_dir = path.join(__dirname, "../");