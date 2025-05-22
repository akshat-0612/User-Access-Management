import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import requestRoutes from './routes/request.routes';
import softwareRoutes from './routes/software.routes';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

export default app;
