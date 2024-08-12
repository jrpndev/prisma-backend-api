import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { registerRoutes } from './routes';

const app = express();

const prisma = new PrismaClient();

app.use(cors());

app.use(bodyParser.json());

registerRoutes(app, prisma);

const PORT = process.env.PORT;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
