import { POST } from './POST';

export interface SAVED_POSTS_STATE {
  isLoading: boolean;
  savedPosts?: POST[];
}
