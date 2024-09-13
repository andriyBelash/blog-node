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
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      try {
        const result = await this.authServices.login(email, password);
        if (result) {
          res.json({
            message: 'Login successful',
            user: {
              id: result.user.id,
              username: result.user.username,
              email: result.user.email,
              role: result.user.role
            },
            access_token: result.access_token,
            refresh_token: result.refresh_token
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

  public refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body
    if(!token) {
      return res.status(400).json({ message: 'Refresh token is required' })
    }
    try {
      const result = await this.authServices.refreshToken(token);
      if (result) {
        res.json({
          message: 'Token refreshed successfully',
          access_token: result.access_token,
          refresh_token: result.refresh_token
        });
      } else {
        res.status(401).json({ message: 'Invalid refresh token' });
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ message: 'An error occurred while refreshing the token' });
    }
  }
}