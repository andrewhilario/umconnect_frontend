export interface Stories {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

export interface StoryData {
  id: number;
  user: User;
  story: string;
  created_at: Date;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  phone_number: string;
  bio: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  cover_photo: string;
}
