import { string, z, ZodType } from "zod";

export class AuthValidation {

    static readonly Login: ZodType = z.object({
        email: z.string({required_error: "Email is required", invalid_type_error: "Email format is wrong"}).email(),
        password: z.string().min(1, {message: "Password is required"})
    })

} 