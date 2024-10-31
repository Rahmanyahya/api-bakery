import { role, User } from "@prisma/client"
import "dotenv/config"
import jwt from "jsonwebtoken"

export type LoginRequest = {
    email: string
    password: string
} 

export type LoginResponse = {
    username: string
    token: string
}

export type payload = {
    user_name: string,
    user_role: role
}

export const toLoginResponse = (User: User): LoginResponse => {
    return {
        username: User.user_name,
        token: jwt.sign({ user_name: User.user_name, user_role: User.user_role }, process.env.JWT_SECRET!),
    }
}

