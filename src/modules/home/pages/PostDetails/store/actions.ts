import { postDetailsActions } from './index';
import { HomeAction } from '../../../types/HomeActions';
import Services from '../api/Services';
import { POST } from 'modules/home/interfaces/POST';
import { COMMENT } from 'modules/home/interfaces/COMMENT';
export const getPost = (postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(postDetailsActions.setIsLoading(true));
    try {
      const res = await Services.getPost(postId);

      const { post }: { post: POST } = res.data;
      // post.isLiked = res.data.isLiked;

      dispatch(postDetailsActions.setPostState({ post }));
    } catch (err) {
    } finally {
      dispatch(postDetailsActions.setIsLoading(false));
    }
  };
};
export const editPost = (data: FormData, postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(postDetailsActions.setIsLoading(true));
    try {
      await Services.editPost(data, postId);
    } catch (err) {
    } finally {
      dispatch(postDetailsActions.setIsLoading(false));
    }
  };
};

export const deletePost = (postId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(postDetailsActions.setIsLoading(true));
    try {
      await Services.deletePost(postId);
    } catch (err) {
    } finally {
      dispatch(postDetailsActions.setIsLoading(false));
    }
  };
};

export const deletePostAttachment = (
  postId: string,
  attachment: string
): HomeAction<void> => {
  return async dispatch => {
    dispatch(postDetailsActions.setIsLoading(true));
    try {
      await Services.deletePostAttachment(postId, attachment);
    } catch (err) {
    } finally {
      dispatch(postDetailsActions.setIsLoading(false));
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
    dispatch(postDetailsActions.setIsLoading(true));
    try {
      const res = await Services.getCommentsOnPost(postId);
      const { comments }: { comments: COMMENT[] } = res.data;
      dispatch(postDetailsActions.setCommentsOnPost(comments));
    } catch (err) {
    } finally {
      dispatch(postDetailsActions.setIsLoading(false));
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
