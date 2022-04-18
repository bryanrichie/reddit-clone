import { DatabasePool, QueryResult, sql } from 'slonik';

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
}
