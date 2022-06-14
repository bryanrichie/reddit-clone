export interface User {
  id: string;
  username: string;
}

export interface Post {
  id: string;
}

export interface JwtToken {
  exp: number;
  id: string;
  username: string;
}
