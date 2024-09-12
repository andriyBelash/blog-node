import { User } from "../../../shared/entities/user.entity.js";
import { Repository } from "typeorm";
import AppDataSource from "../../../../config/database.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../../../config/constants.js"



export class UserServices {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  generateToken(user: User): string {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
  }

  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    const user = await this.validateUser(email, password);
    if (!user) {
      return null;
    }
    const token = this.generateToken(user);
    return { user, token };
  }
}