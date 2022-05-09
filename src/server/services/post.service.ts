import { DatabasePost, DatabaseService } from './database.service';

export class PostService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  createPost(userId: string, title: string, body: string, image: string): Promise<DatabasePost> {
    return this.databaseService.writePost({ userId, title, body, image });
  }

  deletePost(postId: string, userId: string) {
    return this.databaseService.deletePost(postId, userId);
  }

  editPost(
    postId: string,
    userId: string,
    title: string,
    body: string,
    image: string
  ): Promise<DatabasePost> {
    return this.databaseService.editPost(postId, { userId, title, body, image });
  }

  servePost(postId: string): Promise<DatabasePost> {
    return this.databaseService.servePost(postId);
  }
}
