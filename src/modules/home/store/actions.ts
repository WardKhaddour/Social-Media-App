import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import Services from '../Services';
import { AnyAction } from 'redux';
import { homeActions } from './homeSlice';

export interface IPOST {
  _id: string;
  title: string;
  author: { name: string; _id: string };
  content: string;
  publishedAt: string;
  category: { _id: string; name: string }[];
  likesNum: number;
  commentsNum: number;
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

export interface ICOMMENT {
  _id: string;
  content: string;
  addedAt: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
}

type HomeAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

export const getAllPosts = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getAllPosts();
      const { posts }: { posts: IPOST[] } = res.data;

      dispatch(homeActions.setPosts(posts));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const getPost = (postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getPost(postId);

      const { post }: { post: IPOST } = res.data;
      console.log(post);

      dispatch(homeActions.setCurrentPost(post));
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

      dispatch(homeActions.setCategories(categories));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const addLike = (postId: string): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.addLike(postId);
    } catch (err) {}
  };
};

export const savePost = (postId: string): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.savePost(postId);
    } catch (err) {}
  };
};

export const getCommentsOnPost = (postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getCommentsOnPost(postId);
      const { comments }: { comments: ICOMMENT[] } = res.data;
      dispatch(homeActions.setCommentsOnPost(comments));
      console.log(comments);
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const addComment = (
  postId: string,
  comment: string
): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.addComment(postId, comment);
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};
