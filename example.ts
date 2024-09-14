// // user.controller.ts
// import { Request, Response } from "express";
// import { getRepository } from "typeorm";
// import { User } from "./user.entity";

// export class UserController {
//     private userRepository = getRepository(User);

//     // Create
//     async create(req: Request, res: Response) {
//         const newUser = this.userRepository.create(req.body);
//         const results = await this.userRepository.save(newUser);
//         return res.json(results);
//     }

//     // Read
//     async getAll(req: Request, res: Response) {
//         const users = await this.userRepository.find();
//         return res.json(users);
//     }

//     async getOne(req: Request, res: Response) {
//         const user = await this.userRepository.findOne(req.params.id);
//         return res.json(user);
//     }

//     // Update
//     async update(req: Request, res: Response) {
//         const user = await this.userRepository.findOne(req.params.id);
//         if (user) {
//             this.userRepository.merge(user, req.body);
//             const results = await this.userRepository.save(user);
//             return res.json(results);
//         }
//         return res.status(404).json({ message: "User not found" });
//     }

//     // Delete
//     async delete(req: Request, res: Response) {
//         const results = await this.userRepository.delete(req.params.id);
//         return res.json(results);
//     }
// }