import { savedPostsActions } from './index';
import { HomeAction } from '../../../types/HomeActions';
import Services from '../api/Services';

export const getSavedPosts = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(savedPostsActions.setIsLoading(true));

    try {
      const res = await Services.getSavedPosts();
      const { posts } = res.data;
      dispatch(savedPostsActions.setSavedPostsState({ posts }));
    } catch (err) {
    } finally {
      dispatch(savedPostsActions.setIsLoading(false));
    }
  };
};
