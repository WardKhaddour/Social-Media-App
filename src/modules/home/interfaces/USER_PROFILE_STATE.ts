import { USER } from './USER';
import { USER_DETAILS } from './USER_DETAILS';

export interface USER_PROFILE_STATE {
  isLoading: boolean;
  followsIsLoading: boolean;
  userProfileDetails?: USER_DETAILS;
  followStats?: {
    shown: boolean;
    type: string;
  };
  followers?: { _id: string; user: USER; isFollowing: boolean }[];
  followings?: { _id: string; user: USER; isFollowing: boolean }[];
}
