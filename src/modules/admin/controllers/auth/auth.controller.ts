import { AuthServices } from "../../services/auth/auth.services.js";
import { Request, Response } from "express";

export class AuthController {
  private authServices: AuthServices

  constructor() {
    this.authServices = new AuthServices()
  }

  public login (req: Request, res: Response) {
    return res.status(200).json({ message: 'is work' })
  }
}