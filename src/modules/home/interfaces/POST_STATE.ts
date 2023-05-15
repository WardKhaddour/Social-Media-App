import { POST } from './POST';
import { COMMENT } from './COMMENT';
export interface POST_STATE {
  isLoading: boolean;
  post?: POST;
  comments?: COMMENT[];
}
