import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';
import { loginValidator } from '../../shared/utils/validation/auth.validation.js'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js';
const authRouter = express();

const controller = new AuthController()

authRouter.post('/login', loginValidator, controller.login);
authRouter.post('/refresh', authMiddleware, controller.refreshToken);


export default authRouter;
