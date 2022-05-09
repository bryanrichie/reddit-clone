import { ConnectionError, createMockQueryResult, DatabasePool, QueryResult, sql } from 'slonik';
import { User } from '../../common/types';

export interface DatabaseUser {
  email: string;
  username: string;
  password: string;
}

export interface DatabasePost {
  userId: string;
  title: string;
  body: string;
  image: string;
}

export class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async userExists(email: string, username: string): Promise<Boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(
        sql`SELECT * 
            FROM users 
            WHERE username = ${username} OR email = ${email}`
      );
    });
  }

  async writeUser(user: DatabaseUser): Promise<DatabaseUser> {
    const { email, username, password } = user;

    const queryResult = await this.pool.connect(async (connection) => {
      return connection.one<DatabaseUser>(
        sql`INSERT INTO users (email, username, password_hash) 
            VALUES (${email}, ${username}, ${password}) 
            RETURNING email, username`
      );
    });
    return queryResult;
  }

  async updateUser(userId: string, user: DatabaseUser): Promise<DatabaseUser> {
    const { email, username, password } = user;

    const queryResult = await this.pool.connect(async (connection) => {
      return connection.one<DatabaseUser>(
        sql`UPDATE users
            SET email = ${email}, username = ${username}, password_hash = ${password}, updated_at = now() 
            WHERE id = ${userId}
            RETURNING email, username, password_hash;`
      );
    });
    return queryResult;
  }

  async validUser(username: string, password: string): Promise<Boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(
        sql`SELECT * 
            FROM users 
            WHERE username = ${username} AND password_hash = ${password}`
      );
    });
  }

  async getUser(username: string): Promise<DatabaseUser | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<DatabaseUser>(
        sql`SELECT * 
            FROM users 
            WHERE username = ${username}`
      );
    });
  }

  async getPartialUser(username: string): Promise<User | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<User>(
        sql`SELECT id, username 
            FROM users 
            WHERE username = ${username}`
      );
    });
  }

  async writePost(userPost: DatabasePost): Promise<DatabasePost> {
    const { userId, title, body, image } = userPost;

    const queryResult = await this.pool.connect(async (connection) => {
      return connection.one<DatabasePost>(
        sql`INSERT INTO posts (user_id, title, body, image) 
            VALUES (${userId}, ${title}, ${body}, ${image}) 
            RETURNING title, body, image`
      );
    });
    return queryResult;
  }

  async deletePost(postId: string, userId: string) {
    const queryResult = await this.pool.connect((connection) => {
      return connection.one(
        sql`DELETE FROM posts 
            WHERE id = ${postId} AND user_id = ${userId} 
            RETURNING title, body, image`
      );
    });
    return queryResult;
  }

  async editPost(postId: string, userPost: DatabasePost): Promise<DatabasePost> {
    const { userId, title, body, image } = userPost;

    const queryResult = await this.pool.connect(async (connection) => {
      return connection.one<DatabasePost>(
        sql`UPDATE posts 
            SET title = ${title}, body = ${body}, image = ${image}, updated_at = now() 
            WHERE id = ${postId} AND user_id = ${userId} 
            RETURNING title, body, image;`
      );
    });
    return queryResult;
  }

  async servePost(postId: string): Promise<DatabasePost> {
    const queryResult = await this.pool.connect(async (connection) => {
      return connection.one<DatabasePost>(
        sql`SELECT *
            FROM posts
            WHERE id = ${postId}`
      );
    });
    return queryResult;
  }
}
