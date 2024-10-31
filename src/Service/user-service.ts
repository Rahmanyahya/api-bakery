import { CreateUserRequest, SearchUser, toUserResponse, UpdateUserRequest, UserDelete, UserResponse } from "../Model/user-model";
import { Validation } from "../validation/validation";
import {UserValidation} from "../validation/user-validation"
import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import bcrypt from "bcrypt"

export class UserService {

    static async CreateUser(req: CreateUserRequest): Promise<UserResponse> {
        const userAddRequest = Validation.validate(UserValidation.CREATE_USER, req)

        const isUserExist = await prisma.user.count({
            where: {
                user_email: userAddRequest.user_email
            }
        })

        if (isUserExist != 0) throw new ErrorHandler(400, "user already exists")
        
        userAddRequest.user_password = await bcrypt.hash(userAddRequest.user_password,10)

        const user = await prisma.user.create({
            data: userAddRequest
        })

        return toUserResponse(user)
    }

    static async UpdateUser(req: UpdateUserRequest): Promise<UserResponse> {
        const userUpdateRequest = Validation.validate(UserValidation.UPDATE_USER, req)

        const dataUser = await prisma.user.findFirst({
            where: {
                user_email: userUpdateRequest.user_email
            }
        })

        if (!dataUser) throw new ErrorHandler(404, "user not found")
        
        userUpdateRequest.user_email = userUpdateRequest.user_email ? userUpdateRequest.user_email : dataUser.user_email;
        userUpdateRequest.user_name = userUpdateRequest.user_name ? userUpdateRequest.user_name : dataUser.user_email
        userUpdateRequest.user_role = userUpdateRequest.user_role? userUpdateRequest.user_role : dataUser.user_role
        userUpdateRequest.user_password = userUpdateRequest.user_password? await bcrypt.hash(userUpdateRequest.user_password,10) : dataUser.user_password
        
        const result = await prisma.user.update({where: {user_email: dataUser.user_email}, data: userUpdateRequest})

        return toUserResponse(result)
    }

    static async DeleteUser (req: UserDelete) {
        const userDeleteRequest = Validation.validate(UserValidation.DELETE_USER, req)
        
        const dataUser = await prisma.user.findFirst({where: {id: userDeleteRequest.id}})

        if (!dataUser) throw new ErrorHandler(404, "user not found")
        
        await prisma.user.delete({where: {id: dataUser.id}})

        return "OK"
    }

    static async GetAllUser (): Promise<UserResponse[] | Error> {
        const users = await prisma.user.findMany()
        return users.length > 0 ? users.map(toUserResponse) : new ErrorHandler(404, "user not found")
    }

    static async SearchUsers (req: SearchUser): Promise<UserResponse[] | Error> {
        const searchUserRequest = Validation.validate(UserValidation.SEARCH_USER, req)

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { user_name: { contains: searchUserRequest.keyword } },
                    { user_email: { contains: searchUserRequest.keyword } }
                ]
            }
        })

        return users.length > 0? users.map(toUserResponse) : new ErrorHandler(404, "user not found")
    }

}