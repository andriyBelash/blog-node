import express, { Request, Response } from 'express';
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js';
import { UserController } from '../controllers/user/user.controller.js';

const profileRouter = express();

const controller = new UserController()

profileRouter.get('/', authMiddleware, controller.getUsers)

export default profileRouter;
