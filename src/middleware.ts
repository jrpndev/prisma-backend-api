import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY ?? 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const payload: any = jwt.verify(token, SECRET_KEY);
      (req as any).userId = payload.userId;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
};
