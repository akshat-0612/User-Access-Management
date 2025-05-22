import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Software } from '../entities/Software';
import { Request } from '../entities/Request';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Software, Request],
});
