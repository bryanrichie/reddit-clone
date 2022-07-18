import { Post } from '../types';
import {
  AddCommentDto,
  AddCommentVoteDto,
  AddPostVoteDto,
  AddReplyDto,
  CreateDatabasePostDto,
  DatabaseComment,
  DatabasePost,
  DatabaseService,
  DeleteCommentVoteDto,
  DeleteDatabasePostDto,
  DeletePostVoteDto,
  UpdateCommentVoteDto,
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

  getComments(postId: string, userId: string): Promise<readonly DatabaseComment[]> {
    return this.databaseService.getComments(postId, userId);
  }

  addReply(reply: AddReplyDto): Promise<void> {
    return this.databaseService.addReply(reply);
  }

  getReplies(parentId: string, userId: string): Promise<readonly DatabaseComment[]> {
    return this.databaseService.getReplies(parentId, userId);
  }

  addPostVote(postVote: AddPostVoteDto): Promise<void> {
    return this.databaseService.addPostVote(postVote);
  }

  updatePostVote(postVote: UpdatePostVoteDto): Promise<void> {
    return this.databaseService.updatePostVote(postVote);
  }

  deletePostVote(postVote: DeletePostVoteDto): Promise<void> {
    return this.databaseService.deletePostVote(postVote);
  }

  addCommentVote(commentVote: AddCommentVoteDto): Promise<void> {
    return this.databaseService.addCommentVote(commentVote);
  }

  updateCommentVote(commentVote: UpdateCommentVoteDto): Promise<void> {
    return this.databaseService.updateCommentVote(commentVote);
  }

  deleteCommentVote(commentVote: DeleteCommentVoteDto): Promise<void> {
    return this.databaseService.deleteCommentVote(commentVote);
  }
}
