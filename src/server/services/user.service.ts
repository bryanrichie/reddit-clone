import { User } from '../../common/types';
import { DatabaseService } from './database.service';

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  getUserForJwt = (username: string): Promise<User | null> => {
    return this.databaseService.getPartialUser(username);
  };
}
