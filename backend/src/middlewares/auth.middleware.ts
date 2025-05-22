import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
      (req as any).user = {
        id: (decoded as JwtPayload).id,
        role: (decoded as JwtPayload).role,
      };
      next();
    } else {
      res.status(401).json({ message: 'Invalid token payload' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
