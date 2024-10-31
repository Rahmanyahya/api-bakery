import multer from "multer";
import { Request } from "express";
import { root_dir } from "../config/config";
import { ErrorHandler } from "../error/response-error";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (err: Error | null, destination: string) => void) => {
        cb(null, `${root_dir}/public/cake`)
    },
    filename: (req: Request, file: Express.Multer.File, cb: (err: Error | null, filename: string) => void) => {
       file.filename.split(".").length > 1? cb(new ErrorHandler(401, `File is denied`), file.originalname) : cb(null, `${Math.random()}-${file.originalname}`)
    }
})

const filterFile = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedFiles = /png|jpg|jpeg/
    allowedFiles.test(file.mimetype)? cb(null,true) : cb(new ErrorHandler(401, `File is denied`))
    
}

export const uploadCakePhoto = multer({
    storage: storage,
    fileFilter: filterFile,
    limits: {fileSize: 2 * 1024 * 1024}
})