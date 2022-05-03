import { DatabaseService } from './database.service';

export class PostService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async createPost(userId: string, title: string, body: string, image: string) {
    return await this.databaseService.writePost({ userId, title, body, image });
  }

  async deletePost(postId: string, userId: string) {
    return await this.databaseService.deletePost(postId, userId);
  }

  async editPost(postId: string, userId: string, title: string, body: string, image: string) {
    return await this.databaseService.editPost(postId, { userId, title, body, image });
  }
}
