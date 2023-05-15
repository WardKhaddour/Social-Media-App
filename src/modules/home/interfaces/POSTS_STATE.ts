import { POST } from './POST';
import { PAGINATION } from './PAGINATION';
export interface POSTS_STATE {
  isLoading: boolean;
  pagination: PAGINATION;
  posts: POST[];
}
