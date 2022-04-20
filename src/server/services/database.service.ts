import { DatabasePool, QueryResult, sql } from 'slonik';
import { User } from '../../common/types';

export interface DatabaseUser {
  email: string;
  username: string;
  password: string;
}

export class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async userExists(email: string, username: string): Promise<Boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(
        sql`SELECT * FROM users WHERE username = ${username} OR email = ${email}`
      );
    });
  }

  async writeUser(user: DatabaseUser): Promise<QueryResult<DatabaseUser>> {
    const { email, username, password } = user;

    return this.pool.connect((connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (email, username, password_hash) VALUES (${email}, ${username}, ${password})`
      );
    });
  }

  async verifyUser(username: string, password: string): Promise<Boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(
        sql`SELECT * FROM users WHERE username = ${username} AND password_hash = ${password}`
      );
    });
  }

  async getUser(username: string): Promise<DatabaseUser | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<DatabaseUser>(
        sql`SELECT * FROM users WHERE username = ${username}`
      );
    });
  }

  async getPartialUser(username: string): Promise<User | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<User>(
        sql`SELECT id, username FROM users WHERE username = ${username}`
      );
    });
  }
}
