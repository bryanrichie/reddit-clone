import {
  CreateDatabasePostDto,
  DatabasePost,
  DatabaseService,
  UpdateDatabasePostDto,
} from './database.service';

export class PostService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  createPost(post: CreateDatabasePostDto): Promise<DatabasePost> {
    return this.databaseService.createPost(post);
  }

  deletePost(postId: string, userId: string) {
    return this.databaseService.deletePost(postId, userId);
  }

  editPost(postId: string, post: UpdateDatabasePostDto): Promise<DatabasePost> {
    return this.databaseService.editPost(postId, post);
  }

  servePost(postId: string): Promise<DatabasePost> {
    return this.databaseService.servePost(postId);
  }
}
