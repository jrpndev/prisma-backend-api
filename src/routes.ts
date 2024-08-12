import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import { registerUser, loginUser, getUser } from './controllers';
import { authMiddleware } from './middleware';

export const registerRoutes = (app: Express, prisma: PrismaClient) => {
  app.post('/users/create', (req, res) => registerUser(req, res, prisma));
  app.post('/auth/login', (req, res) => loginUser(req, res, prisma));
  app.get('/users/me', authMiddleware, (req, res) => getUser(req, res, prisma));
};
