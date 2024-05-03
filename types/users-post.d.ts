export interface UsersPosts {
  id: number;
  content: string;
  post_type: string;
  is_shared: boolean;
  user: User;
  created_at: Date;
  updated_at: Date;
  comments: any[];
  likes: any[];
  shares: any[];
  post_image: null;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_picture: null;
}
