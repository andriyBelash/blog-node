import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_ACCESS } from '../../../config/constants.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_ACCESS) as { username: string, sub: string, role: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_ACCESS) as { username: string, sub: string, role: string };
    (req as any).user = decoded;
    if((req as any).user === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'The role does not have access' })
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}