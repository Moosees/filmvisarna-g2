import 'express-session';
import { UserController } from '../typescript/controller/UserController';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
  }
}
