import { DatabasePool, sql } from 'slonik';
import { Post, User } from '../types';

export interface DatabaseUser {
  email: string;
  username: string;
  password: string;
}

export interface DatabasePost {
  id: string;
  userId: string;
  title: string;
  text: string | null;
  url: string | null;
  created_at: string;
  username: string;
  comment_count: string;
  upvotes: string;
  downvotes: string;
  vote_status: boolean | null;
}

export interface CreateDatabasePostDto {
  userId: string;
  title: string;
  text: string | null;
  url: string | null;
}

export interface DeleteDatabasePostDto {
  postId: string;
}

export interface DatabaseComment {
  id: string;
  postId: string;
  userId: string;
  parentId: string | null;
  comment: string;
  created_at: string;
  username: string;
  upvotes: string;
  downvotes: string;
  vote_status: boolean | null;
}

export interface AddCommentDto {
  userId: string;
  postId: string;
  comment: string;
}

export interface AddReplyDto {
  userId: string;
  postId: string;
  parentId: string;
  reply: string;
}

export interface DatabasePostVote {
  id: string;
  postId: string;
  userId: string;
  vote: boolean | null;
}

export interface AddPostVoteDto {
  postId: string;
  userId: string;
  vote: boolean;
}

export interface UpdatePostVoteDto {
  postId: string;
  userId: string;
  vote: boolean;
}

export interface DeletePostVoteDto {
  postId: string;
  userId: string;
}

export interface DatabaseCommentVote {
  id: string;
  commentId: string;
  userId: string;
  vote: boolean | null;
}

export interface AddCommentVoteDto {
  commentId: string;
  userId: string;
  vote: boolean;
}

export interface UpdateCommentVoteDto {
  commentId: string;
  userId: string;
  vote: boolean;
}

export interface DeleteCommentVoteDto {
  commentId: string;
  userId: string;
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

  async writeUser(user: DatabaseUser): Promise<void> {
    const { email, username, password } = user;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (email, username, password_hash) 
            VALUES (${email}, ${username}, ${password}) 
            RETURNING email, username`
      );
    });
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
        sql`SELECT id, username, email
            FROM users 
            WHERE username = ${username}`
      );
    });
  }

  async createPost(userPost: CreateDatabasePostDto): Promise<Post> {
    const { userId, title, text, url } = userPost;

    return this.pool.connect((connection) => {
      return connection.one<DatabasePost>(
        sql`INSERT INTO posts (user_id, title, text, url) 
            VALUES (${userId}, ${title}, ${text}, ${url})
            RETURNING id`
      );
    });
  }

  async deletePost(post: DeleteDatabasePostDto): Promise<void> {
    const { postId } = post;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabasePostVote>(
        sql`DELETE FROM posts
            WHERE id = ${postId}`
      );
    });
  }

  async getPosts(userId: string): Promise<readonly DatabasePost[]> {
    return this.pool.connect(async (connection) => {
      const { rows } = await connection.query<DatabasePost>(
        sql`SELECT posts.id, posts.title, posts.text, posts.url, posts.created_at, users.username, 
            (SELECT count(*) AS comment_count FROM comments WHERE comments.post_id = posts.id),
            (SELECT count(*) AS upvotes FROM user_post_votes WHERE user_post_votes.post_id = posts.id AND vote = True),
            (SELECT count(*) AS downvotes FROM user_post_votes WHERE user_post_votes.post_id = posts.id AND vote = False),
            (SELECT vote AS vote_status FROM user_post_votes WHERE user_post_votes.user_id = ${userId} AND user_post_votes.post_id = posts.id LIMIT 1)
            FROM posts
            INNER JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC`
      );
      return rows;
    });
  }

  async getPost(post: Pick<DatabasePost, 'id' | 'userId'>): Promise<DatabasePost | null> {
    const { id, userId } = post;

    return this.pool.connect(async (connection) => {
      return connection.maybeOne<DatabasePost>(
        sql`SELECT posts.id AS post_id, posts.title, posts.text, posts.url, posts.created_at, users.username, users.id AS user_id, 
            (SELECT count(*) AS comment_count FROM comments WHERE comments.post_id = ${id}), 
            (SELECT count(*) AS upvotes FROM user_post_votes WHERE user_post_votes.post_id = ${id} AND vote = True),
            (SELECT count(*) AS downvotes FROM user_post_votes WHERE user_post_votes.post_id = ${id} AND vote = False),
            (SELECT vote AS vote_status FROM user_post_votes WHERE user_post_votes.user_id = ${userId} AND user_post_votes.post_id = ${id} LIMIT 1)
            FROM posts
            INNER JOIN users ON posts.user_id = users.id
            WHERE posts.id = ${id}`
      );
    });
  }

  async addComment(postComment: AddCommentDto): Promise<void> {
    const { userId, postId, comment } = postComment;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseComment>(
        sql`INSERT INTO comments (user_id, post_id, comment)
            VALUES (${userId}, ${postId}, ${comment})`
      );
    });
  }

  async getComments(postId: string, userId: string): Promise<readonly DatabaseComment[]> {
    return this.pool.connect(async (connection) => {
      const { rows } = await connection.query<DatabaseComment>(
        sql`SELECT comments.id, comments.comment, comments.created_at, users.username,
            (SELECT count(*) AS upvotes FROM user_comment_votes WHERE user_comment_votes.comment_id = comments.id AND vote = True),
            (SELECT count(*) AS downvotes FROM user_comment_votes WHERE user_comment_votes.comment_id = comments.id AND vote = False),
            (SELECT vote AS vote_status FROM user_comment_votes WHERE user_comment_votes.user_id = ${userId} AND user_comment_votes.comment_id = comments.id LIMIT 1)
            FROM comments
            INNER JOIN posts ON comments.post_id = posts.id
            INNER JOIN users ON comments.user_id = users.id
            WHERE posts.id = ${postId} AND comments.parent_id IS NULL
            ORDER BY comments.created_at DESC`
      );
      return rows;
    });
  }

  async getReplies(parentId: string, userId: string): Promise<readonly DatabaseComment[]> {
    return this.pool.connect(async (connection) => {
      const { rows } = await connection.query<DatabaseComment>(
        sql`SELECT comments.id, comments.comment, comments.created_at, users.username,
            (SELECT count(*) AS upvotes FROM user_comment_votes WHERE user_comment_votes.comment_id = comments.id AND vote = True),
            (SELECT count(*) AS downvotes FROM user_comment_votes WHERE user_comment_votes.comment_id = comments.id AND vote = False),
            (SELECT vote AS vote_status FROM user_comment_votes WHERE user_comment_votes.user_id = ${userId} AND user_comment_votes.comment_id = comments.id LIMIT 1)
            FROM comments
            INNER JOIN posts ON comments.post_id = posts.id
            INNER JOIN users ON comments.user_id = users.id
            WHERE comments.parent_id = ${parentId}
            ORDER BY comments.created_at DESC`
      );
      return rows;
    });
  }

  async addReply(commentReply: AddReplyDto): Promise<void> {
    const { userId, postId, parentId, reply } = commentReply;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseComment>(
        sql`INSERT INTO comments (user_id, post_id, parent_id, comment)
            VALUES (${userId}, ${postId}, ${parentId}, ${reply})`
      );
    });
  }

  async addPostVote(postVote: AddPostVoteDto): Promise<void> {
    const { userId, postId, vote } = postVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabasePostVote>(
        sql`INSERT INTO user_post_votes (user_id, post_id, vote)
            VALUES (${userId}, ${postId}, ${vote})`
      );
    });
  }

  async updatePostVote(postVote: UpdatePostVoteDto): Promise<void> {
    const { postId, userId, vote } = postVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabasePostVote>(
        sql`UPDATE user_post_votes SET vote = ${vote}
            WHERE post_id = ${postId} AND user_id = ${userId}`
      );
    });
  }

  async deletePostVote(postVote: DeletePostVoteDto): Promise<void> {
    const { postId, userId } = postVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabasePostVote>(
        sql`DELETE FROM user_post_votes
            WHERE post_id = ${postId} AND user_id = ${userId}`
      );
    });
  }

  async addCommentVote(commentVote: AddCommentVoteDto): Promise<void> {
    const { userId, commentId, vote } = commentVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseCommentVote>(
        sql`INSERT INTO user_comment_votes (user_id, comment_id, vote)
            VALUES (${userId}, ${commentId}, ${vote})`
      );
    });
  }

  async updateCommentVote(commentVote: UpdateCommentVoteDto): Promise<void> {
    const { commentId, userId, vote } = commentVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseCommentVote>(
        sql`UPDATE user_comment_votes SET vote = ${vote}
            WHERE comment_id = ${commentId} AND user_id = ${userId}`
      );
    });
  }

  async deleteCommentVote(commentVote: DeleteCommentVoteDto): Promise<void> {
    const { commentId, userId } = commentVote;

    await this.pool.connect(async (connection) => {
      return connection.query<DatabaseCommentVote>(
        sql`DELETE FROM user_comment_votes
            WHERE comment_id = ${commentId} AND user_id = ${userId}`
      );
    });
  }
}
