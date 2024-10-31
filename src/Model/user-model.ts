import {role, User} from "@prisma/client"

export type UserResponse = {
    user_name: string;
    user_email: string;
    user_role: role;
}

export type CreateUserRequest = {
    user_name: string;
    user_email: string;
    user_role: role;
    user_password: string;
}

export type UpdateUserRequest = {
    id?: number; 
    user_name?: string;
    user_email?: string;
    user_role?: role;
    user_password?: string;
}

export type UserDelete = {
    id: number;
}

export type SearchUser = {
    keyword: string
} 

export function toUserResponse(user: CreateUserRequest) {
    return {
        user_name: user.user_name,
        user_email: user.user_email,
        user_role: user.user_role,
    }
}