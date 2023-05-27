import { USER } from 'modules/home/interfaces/USER';
import { POST } from './POST';
import { COMMENT } from './COMMENT';
export interface POST_STATE {
  isLoading: boolean;
  post?: POST;
  comments?: COMMENT[];
  likes?: { _id: string; user: USER }[];
  isLikesShown: boolean;
}
