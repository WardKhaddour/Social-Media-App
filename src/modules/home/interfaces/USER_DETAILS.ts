import { POST } from 'modules/home/interfaces/POST';

export interface USER_DETAILS {
  _id: string;
  name: string;
  email: string;
  photo: string;
  followersNum: number;
  followingNum: number;
  posts: POST[];
  bio: string;
  isFollowing?: boolean;
}
