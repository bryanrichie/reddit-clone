import { User } from './src/common/types';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
