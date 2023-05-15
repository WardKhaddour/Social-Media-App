import { USER } from './USER';
import { PAGINATION } from './PAGINATION';
export interface USERS_STATE {
  isLoading: boolean;
  pagination: PAGINATION;
  users: USER[];
}
