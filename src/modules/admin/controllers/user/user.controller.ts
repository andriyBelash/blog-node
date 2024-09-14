import { UserServices } from "../../services/user/user.services.js";
import { Request, Response } from "express";

export class UserController {
  private userServices: UserServices;

  constructor() {
      this.userServices = new UserServices();
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const data = await this.userServices.getList(req.query);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error in getUsers:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}