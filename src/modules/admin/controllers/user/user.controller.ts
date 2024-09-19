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

  public create = async (req: Request, res: Response) => {
    try {
      const data = await this.userServices.create(req);
      const { password, ...user } = data;
      return res.status(201).json(user);
    } catch (error: { message: string } | any) {
      if (error.message) {
        return res.status(400).json({ message: error.message });
      }
      console.error("Error in create user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public remove = async(req: Request, res: Response) => {
    try {
      const data = await this.userServices.deleteUser(req)
      return res.status(204).json(data)
    } catch(error) {
      console.error("Error in create user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public update = async(req: Request, res: Response) => {
    try {
      const data = await this.userServices.update(req);
      const { password, ...user } = data;
      return res.status(201).json(user);
    } catch (error: { message: string } | any) {
      if (error.message) {
        return res.status(400).json({ message: error.message });
      }
      console.error("Error in create user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}