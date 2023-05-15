import { postsActions } from './index';
import { HomeAction } from 'modules/home/types/HomeActions';
import Services from '../api/Services';
import { POST } from 'modules/home/interfaces/POST';
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
    dispatch(postsActions.setIsLoading(true));
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
      }: { posts: POST[]; totalPages: number; page: number } = res.data;

      dispatch(
        postsActions.setPostsState({ posts, pagination: { page, totalPages } })
      );
    } catch (err) {
    } finally {
      dispatch(postsActions.setIsLoading(false));
    }
  };
};

export const addNewPost = (data: FormData): HomeAction<void> => {
  return async dispatch => {
    dispatch(postsActions.setIsLoading(true));
    try {
      await Services.addPost(data);
    } catch (err) {
    } finally {
      dispatch(postsActions.setIsLoading(false));
    }
  };
};
