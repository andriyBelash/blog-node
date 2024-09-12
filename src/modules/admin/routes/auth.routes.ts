import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';

const authRouter = express.Router();

const controller = new AuthController()

authRouter.post('/login', controller.login);

export default authRouter;
