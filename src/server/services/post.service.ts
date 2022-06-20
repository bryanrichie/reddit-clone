import {
  AddCommentDto,
  AddPostVoteDto,
  CreateDatabasePostDto,
  DatabaseComment,
  DatabasePost,
  DatabasePostVote,
  DatabaseService,
  UpdateDatabasePostDto,
} from './database.service';

export class PostService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  createPost(post: CreateDatabasePostDto): Promise<void> {
    return this.databaseService.createPost(post);
  }

  deletePost(postId: string, userId: string) {
    return this.databaseService.deletePost(postId, userId);
  }

  editPost(postId: string, post: UpdateDatabasePostDto): Promise<DatabasePost> {
    return this.databaseService.editPost(postId, post);
  }

  getPosts(): Promise<readonly DatabasePost[]> {
    return this.databaseService.getPosts();
  }

  getPost(postId: string): Promise<DatabasePost> {
    return this.databaseService.getPost(postId);
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

  getPostVotes(postId: string): Promise<readonly DatabasePostVote[]> {
    return this.databaseService.getPostVotes(postId);
  }
}
