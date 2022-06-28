import { CustomError, CustomErrors } from '../customError';
import { User } from '../types';
import { DatabaseService, DatabaseUser } from './database.service';

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async registerUser(email: string, username: string, password: string): Promise<void> {
    const userExists = await this.databaseService.userExists(email, username);

    if (userExists) {
      throw new CustomError({
        type: CustomErrors.UserAlreadyExists,
        message: `User already exists`,
        metadata: {
          fields: {
            email: 'Email already exists',
            username: 'Username already exists',
          },
        },
      });
    }
    await this.databaseService.writeUser({ email, username, password });
  }

  async getUserForJwt(username: string, password: string): Promise<User | null> {
    const validUser = await this.databaseService.validUser(username, password);

    if (!validUser) {
      throw new CustomError({
        type: CustomErrors.InvalidLoginCredentials,
        message: `Invalid login credentials`,
      });
    }
    return this.databaseService.getPartialUser(username);
  }

  // updateUser(
  //   userId: string,
  //   email: string,
  //   username: string,
  //   password: string
  // ): Promise<DatabaseUser> {
  //   return this.databaseService.updateUser(userId, { email, username, password });
  // }
}
