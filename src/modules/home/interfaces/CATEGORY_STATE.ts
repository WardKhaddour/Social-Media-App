import { CATEGORY } from './CATEGORY';
import { PAGINATION } from './PAGINATION';
export interface CATEGORY_STATE {
  isLoading: boolean;
  pagination: PAGINATION;
  categories: CATEGORY[];
}
