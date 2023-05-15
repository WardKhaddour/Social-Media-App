import { CATEGORY } from './CATEGORY';
import { PAGINATION } from './PAGINATION';
import { USER } from './USER';

export interface HOME_LAYOUT_STATE {
  isLoading: boolean;
  popularUsers: USER[];
  categories: CATEGORY[];
  pagination: PAGINATION;
}
