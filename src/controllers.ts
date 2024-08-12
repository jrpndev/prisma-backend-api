import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY =  process.env.SECRET_KEY ?? 'secret';

export const registerUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const loginUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY , { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const getUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const userId = (req as any).userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
