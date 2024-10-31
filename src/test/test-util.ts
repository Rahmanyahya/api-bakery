import {prisma} from "../app/database"
import bcrypt from "bcrypt"
import {User,Cake,Material,Order,Supply,Supplier} from "@prisma/client"

export class UserTest {

    static async delete () {
        await prisma.user.deleteMany({
            where: {user_name: {contains: "tes"}}
        })
    }

    static async create () {
        await prisma.user.create({
            data: {
                user_name: "testuser123",
                user_email: "testuser123@gmail.com",
                user_password: await bcrypt.hash("testuser123",10),
                user_role: "admin"
            }
        })
    }

    static async update () {
        await prisma.user.update({
            where: {id: 3},
            data: {
                user_name: "testuser123updated",
                user_email: "testuser123updated@gmail.com",
                user_password: await bcrypt.hash("testuser123updated",10),
                user_role: "cashier"
            }
        })
    }

    static async get(): Promise<User[]>{
        const users = await prisma.user.findMany()
        return users
    }

    static async searchUser(keywoard: string): Promise<User[] | User> {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {user_name: {contains: keywoard}},
                    {user_email: {contains: keywoard}}
                ]
            }
        })

        return users
    }

} 
