import { User } from './src/common/types';
import { PostService } from './src/server/services/post.service';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
