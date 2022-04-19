import { DatabaseService } from './database.service';

export class UserService {
  DatabaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.DatabaseService = databaseService;
  }
}
