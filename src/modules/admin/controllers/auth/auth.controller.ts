import { UserServices } from "../../services/user/user.services.js";
import { Request, Response } from "express";
import { validationResult } from 'express-validator'

export class AuthController {
  private authServices: UserServices;

  constructor() {
    this.authServices = new UserServices();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      try {
        const result = await this.authServices.login(email, password);
        console.log(result, 'RESULT');
        if (result) {
          res.json({
            message: 'Login successful',
            user: {
              id: result.user.id,
              username: result.user.username,
              email: result.user.email,
              role: result.user.role
            },
            token: result.token
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
      }
    } else {
      res.status(422).json({errors: errors.array()});
    }
  }
}