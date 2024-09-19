import { Repository } from "typeorm";
import { User } from "../../../shared/entities/user.entity.js";
import { Request, Response } from "express";
import path from "path";
import AppDataSource from "../../../../config/database.js";
import * as bcrypt from 'bcrypt';

interface PaginationQuery {
  page?: string;
  per_page?: string;
}

export class UserServices {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async getList(query: PaginationQuery) {
    const page = parseInt(query.page || '1');
    const per_page = parseInt(query.per_page || '10');
    const skip = (page - 1) * per_page;

    const [items, total] = await this.userRepository.findAndCount({
        skip: skip,
        take: per_page,
        order: { id: "ASC" }
    });

    const totalPages = Math.ceil(total / per_page);

    const users = items.map(({ password, ...rest }) => rest);
    return {
      data: users,
      meta: { total, page, per_page, last_page: totalPages }
    };
  }

  private getFullUrl (req: Request, path: string) {
    return `${req.protocol}://${req.get('host')}/${path}`;
  };

  async create(req: Request): Promise<User> {
    try {
      const { username, email, password } = req.body;
      
      const availableEmailUser = await this.userRepository.findOne({ where: { email } });
      if (availableEmailUser) {
        throw new Error('This email is already in use');
      }
      
      const availableUsernameUser = await this.userRepository.findOne({ where: { username } });
      if (availableUsernameUser) {
        throw new Error('This username is already in use');
      }
      
      const user = req.body;
      user.password = await bcrypt.hash(password, 10);
      
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const file = req.files[0];
        const relativePath = path.relative(process.cwd(), file.path);
        user.picture_url = this.getFullUrl(req, relativePath.replace(/\\/g, '/'));
      }
      
      const newUser = this.userRepository.create(user as User);
      const savedUser = await this.userRepository.save(newUser);
      
      return savedUser;
    } catch (error) {
      console.error("Error in create service:", error);
      throw error;
    }
  }

  async update(req: Request): Promise<User> {
    try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }
  
      const user = await this.userRepository.findOne({
        where: { id: userId } 
      });
  
      if (user) {
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
          const file = req.files[0];
          const relativePath = path.relative(process.cwd(), file.path);
          user.picture_url = this.getFullUrl(req, relativePath.replace(/\\/g, '/'));
        }
  
        this.userRepository.merge(user, req.body);
  
        const results = await this.userRepository.save(user);
        return results;
      }
  
      throw new Error('User not found');
    } catch (error) {
      throw error;
    }
  }
  
  async deleteUser(req: Request) {
    const results = await this.userRepository.delete(req.params.id);
    return results;
  }
}