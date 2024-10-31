import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            user_name: "halo123",
            user_email: "halo123@gmail.com",
            user_password: await bcrypt.hash("halo123",10),
            user_role: "admin"
        }
    })

    await prisma.user.create({
        data: {
            user_name: "tes123",
            user_email: "tes123@gmail.com",
            user_password: await bcrypt.hash("tes123",10),
            user_role: "cashier"
        }
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });