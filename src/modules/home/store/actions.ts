import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import Services from '../Services';
import { AnyAction } from 'redux';
import { homeActions } from './homeSlice';

export interface IPOST {
  _id: string;
  title: string;
  author: [{ name: string; _id: string }];
  content: string;
  publishedAt: string;
  category: { _id: string; name: string }[];
}
export interface IUSERS {
  _id: string;
  name: string;
  bio: string;
  photo: string;
}

export interface ICATEGORIES {
  _id: string;
  name: string;
}

type HomeAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

export const getAllPosts = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getAllPosts();
      const { posts }: { posts: IPOST } = res.data;

      console.log(posts);

      dispatch(homeActions.setPosts(posts));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const mostPopularUsers = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getMostPopularUsers();
      const { users } = res.data;

      dispatch(homeActions.setPopularUsers(users));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const getAllCategories = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getCategories();
      const { categories } = res.data;
      console.log(res.data);

      dispatch(homeActions.setCategories(categories));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};
