export interface Post {
  id: string;
  userId: string;
  title: string;
  text: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
  username: string;
  comment_count: string;
  upvotes: string;
  downvotes: string;
  vote_status: boolean | null;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  comment: string;
  created_at: string;
  updated_at: string;
  username: string;
}

export interface JwtToken {
  exp: number;
  id: string;
  username: string;
  email: string;
}
