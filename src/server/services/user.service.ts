import { User } from '../../common/types';
import { DatabaseService, DatabaseUser } from './database.service';

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async registerUser(email: string, username: string, password: string): Promise<void> {
    const userExists = await this.databaseService.userExists(email, username);

    if (userExists) {
      throw new Error('User already exists.');
    }
    await this.databaseService.writeUser({ email, username, password });
  }

  getUserForJwt(username: string): Promise<User | null> {
    return this.databaseService.getPartialUser(username);
  }
}
