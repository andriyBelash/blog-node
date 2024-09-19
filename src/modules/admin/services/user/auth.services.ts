import { User } from "../../../shared/entities/user.entity.js";
import { Repository } from "typeorm";
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } from "../../../../config/constants.js"
import AppDataSource from "../../../../config/database.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthServices {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    console.log(user)
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  generateToken(user: User, type: 'access' | 'refresh'): string {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const access = jwt.sign(payload, JWT_SECRET_ACCESS as string, { expiresIn: '1h' });
    const refresh = jwt.sign(payload, JWT_SECRET_REFRESH as string);
    return type === 'access' ? access : refresh;
  }

  async login(email: string, password: string): Promise<{ user: User; access_token: string, refresh_token: string } | null> {
    const user = await this.validateUser(email, password);
    if (!user) {
      return null;
    }
    const access_token = this.generateToken(user, 'access');
    const refresh_token = this.generateToken(user, 'refresh');
    return { user, access_token, refresh_token};
  }

  async refreshToken(token: string): Promise<{ access_token: string, refresh_token: string } | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_REFRESH as string) as { username: string, sub: string, role: string };
      const user = await this.userRepository.findOne({ where: { id: Number(decoded.sub) } });
      
      if (!user) {
        return null;
      }

      const access_token = this.generateToken(user, 'access');
      const refresh_token = this.generateToken(user, 'refresh');

      return { access_token, refresh_token };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
}