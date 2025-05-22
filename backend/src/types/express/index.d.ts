/// <reference types="express" />
import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      id: number;
      role: 'Employee' | 'Manager' | 'Admin';
    };
  }
}