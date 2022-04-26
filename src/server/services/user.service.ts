import { QueryResult } from 'slonik';
import { User } from '../../common/types';
import { DatabaseService, DatabaseUser } from './database.service';

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  registerUser = (user: DatabaseUser): Promise<QueryResult<DatabaseUser>> => {
    return this.databaseService.writeUser(user);
  };

  getUserForJwt = (username: string): Promise<User | null> => {
    return this.databaseService.getPartialUser(username);
  };
}
