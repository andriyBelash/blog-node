import express, { NextFunction, Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../../shared/middlewares/auth.middleware.js';
import { UserController } from '../controllers/user/user.controller.js';
import { createValidator } from '../../shared/utils/validation/user.validation.js';
import { validationResult } from 'express-validator';

const profileRouter = express();

const controller = new UserController()

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

profileRouter.get('/', authMiddleware, controller.getUsers)
profileRouter.post('/', authMiddleware, createValidator, handleValidationErrors, controller.create)
profileRouter.delete('/:id', authMiddleware, roleMiddleware, controller.remove)
profileRouter.patch('/:id', authMiddleware, controller.update)

export default profileRouter;
