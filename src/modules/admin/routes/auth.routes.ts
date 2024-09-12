import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';
import { loginValidator } from '../../shared/utils/validation/auth.validation.js'

const authRouter = express();

const controller = new AuthController()

authRouter.post('/login', loginValidator, controller.login);

export default authRouter;
