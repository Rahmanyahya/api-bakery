import { afterEach, describe, it } from "node:test";
import supertest from "supertest"
import { UserTest } from "./test-util";
import {app} from "../index"
import { logger } from "../app/logging";

describe('Create User (POST /api/user)', () => {
    afterEach(async () => {
        await UserTest.delete()
    })

    it('should reject create new user if all input is empty', async () => {
        const response = await supertest(app)
        .post("/api/user")
        .send({
            user_name: "",
            user_email: "",
            user_password: "",
            role: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
    })
})

describe('Delete User (DELETE /api/user)', () => {
    afterEach(async () => {
        await UserTest.delete()
    })

    
})