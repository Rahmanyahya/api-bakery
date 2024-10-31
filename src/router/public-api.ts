import express from 'express'
import {AuthController} from '../Controller/auth-controller'

export const publicRouter = express.Router()
publicRouter.post('/api/login', AuthController.Login)