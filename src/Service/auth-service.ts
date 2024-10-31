import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { LoginRequest, LoginResponse, payload, toLoginResponse } from "../Model/login-model";
import { AuthValidation } from "../validation/auth-validaton";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class AuthService {

    static async Login (req: LoginRequest): Promise<LoginResponse> {
        const LoginRequest = Validation.validate(AuthValidation.Login, req)

        const userData = await prisma.user.findFirst({where: {user_email: LoginRequest.email}}) 

        if (!userData) throw new ErrorHandler(400, "Email or Password is wrong")
        
        const isPasswordMatch = await bcrypt.compare(LoginRequest.password, userData.user_password)

        if (!isPasswordMatch) throw new ErrorHandler(400, "Email or Password is wrong")

        return toLoginResponse(userData)
    }


}