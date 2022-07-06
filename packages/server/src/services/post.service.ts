import { Post } from '../types';
import {
  AddCommentDto,
  AddPostVoteDto,
  CreateDatabasePostDto,
  DatabaseComment,
  DatabasePost,
  DatabaseService,
  DeleteDatabasePostDto,
  DeletePostVoteDto,
  UpdatePostVoteDto,
} from './database.service';

export class PostService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  createPost(post: CreateDatabasePostDto): Promise<Post> {
    return this.databaseService.createPost(post);
  }

  deletePost(post: DeleteDatabasePostDto): Promise<void> {
    return this.databaseService.deletePost(post);
  }

  getPosts(userId: string): Promise<readonly DatabasePost[]> {
    return this.databaseService.getPosts(userId);
  }

  getPost(post: Pick<DatabasePost, 'id' | 'userId'>): Promise<DatabasePost | null> {
    return this.databaseService.getPost(post);
  }

  addComment(comment: AddCommentDto): Promise<void> {
    return this.databaseService.addComment(comment);
  }

  getComments(postId: string): Promise<readonly DatabaseComment[]> {
    return this.databaseService.getComments(postId);
  }

  addPostVote(postVote: AddPostVoteDto): Promise<void> {
    return this.databaseService.addVote(postVote);
  }

  updatePostVote(postVote: UpdatePostVoteDto): Promise<void> {
    return this.databaseService.updateVote(postVote);
  }

  deletePostVote(postVote: DeletePostVoteDto): Promise<void> {
    return this.databaseService.deleteVote(postVote);
  }
}
