import { IUSERS, ICATEGORIES } from './../interfaces';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import Services from '../Services';
import { AnyAction } from 'redux';
import { homeActions } from './homeSlice';
import { ICOMMENT, IPOST } from '../interfaces';

type HomeAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

export const getAllPosts = (
  searchParams?: {
    sort?: string;
    category?: string;
  },
  options?: {
    mostPopular?: boolean;
    byFollowing?: boolean;
  }
): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      let res;
      let category: string | undefined;
      if (searchParams?.category) {
        category = searchParams.category;
        delete searchParams.category;
      }
      if (!options && category) {
        res = await Services.getPostsByCategory(category, searchParams);
      } else if (!options) {
        res = await Services.getAllPosts(searchParams);
      } else if (options?.mostPopular) {
        res = await Services.getMostPopularPosts(searchParams);
      } else if (options.byFollowing) {
        res = await Services.getPostsByFollowing(searchParams);
      }
      const {
        posts,
        totalPages,
        page,
      }: { posts: IPOST[]; totalPages: number; page: number } = res.data;

      dispatch(homeActions.setPosts(posts));
      dispatch(homeActions.sePagination({ page, totalPages }));
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
      // post.isLiked = res.data.isLiked;

      dispatch(homeActions.setCurrentPost(post));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const addNewPost = (data: FormData): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.addNewPost(data);

      const { post }: { post: IPOST } = res.data;
      console.log(post);
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const editPost = (data: FormData, postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      await Services.editPost(data, postId);
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const deletePostAttachment = (
  postId: string,
  attachment: string
): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      await Services.deletePostAttachment(postId, attachment);
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
      const { users }: { users: IUSERS } = res.data;

      dispatch(homeActions.setPopularUsers(users));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const getAllUsers = (searchParams?: object): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getAllUsers(searchParams);
      const {
        users,
        page,
        totalPages,
      }: {
        users: IUSERS;
        totalPages: number;
        page: number;
      } = res.data;

      dispatch(homeActions.setAllUsers(users));
      dispatch(homeActions.sePagination({ page, totalPages }));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const getAllCategories = (searchParams?: object): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getCategories(searchParams);
      const {
        categories,
        page,
        totalPages,
      }: {
        categories: ICATEGORIES;
        totalPages: number;
        page: number;
      } = res.data;

      dispatch(homeActions.setCategories(categories));
      dispatch(homeActions.sePagination({ page, totalPages }));
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
    } catch (err) {}
  };
};

export const editComment = (
  postId: string,
  commentId: string,
  commentText: string
): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.editComment(postId, commentId, commentText);
    } catch (err) {}
  };
};

export const deleteComment = (
  postId: string,
  commentId: string
): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.deleteComment(postId, commentId);
    } catch (err) {}
  };
};

export const getUserDetails = (userId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));
    try {
      const res = await Services.getUserDetails(userId);
      const { user } = res.data;
      dispatch(homeActions.setUserProfileDetails(user));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};

export const followUser = (userId: string): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.followUser(userId);
    } catch (err) {}
  };
};

export const getSavedPosts = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeActions.setIsLoading(true));

    try {
      const res = await Services.getSavedPosts();
      const { posts } = res.data;
      dispatch(homeActions.setSavedPosts(posts));
    } catch (err) {
    } finally {
      dispatch(homeActions.setIsLoading(false));
    }
  };
};
