import { CustomError, CustomErrors } from '../customError';
import { DatabaseService } from './database.service';

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async registerUser(email: string, username: string, password: string) {
    const userExists = await this.databaseService.userExists(email, username);

    if (userExists) {
      throw new CustomError({
        type: CustomErrors.UserAlreadyExists,
        message: `User already exists`,
      });
    }
    return this.databaseService.writeUser({ email, username, password });
  }

  async getUserForJwt(username: string, password: string) {
    const validUser = await this.databaseService.validUser(username, password);

    if (!validUser) {
      throw new CustomError({
        type: CustomErrors.InvalidLoginCredentials,
        message: `Invalid login credentials`,
      });
    }
    return this.databaseService.getPartialUser(username);
  }

  updateUser(userId: string, email: string, username: string, password: string) {
    return this.databaseService.updateUser(userId, { email, username, password });
  }
}
