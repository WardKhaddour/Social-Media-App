import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST_STATE } from 'modules/home/interfaces/POST_STATE';
import '../socket';

const initialState: POST_STATE = {
  isLoading: false,
  post: undefined,
  comments: undefined,
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPostState(state, action: PayloadAction<any>) {
      const { post } = action.payload;

      state.post = post;
    },
    setCommentsOnPost(state, action: PayloadAction<any>) {
      state.comments = action.payload;
    },

    updateCurrentPost(state, action: PayloadAction<any>) {
      if (state.post?._id === action.payload._id) {
        state.post = action.payload;
      }
    },

    addNewComment(state, action: PayloadAction<any>) {
      if (state.post?._id !== action.payload.post) {
        return;
      }
      state.comments
        ? (state.comments = [action.payload.comment, ...state.comments])
        : (state.comments = [action.payload.comment]);
      if (state.post) state.post.commentsNum = action.payload.commentsNum;
    },
    updateComment(state, action: PayloadAction<any>) {
      if (state.post?._id !== action.payload.post) {
        return;
      }
      const commentIndex = state.comments?.findIndex(
        comment => comment._id === action.payload.comment._id
      );
      console.log(commentIndex);

      if (commentIndex !== -1 && state.comments && commentIndex !== undefined) {
        state.comments[commentIndex] = {
          ...state.comments[commentIndex],
          ...action.payload.comment,
        };
      }
    },

    deleteComment(state, action: PayloadAction<any>) {
      if (state.post?._id !== action.payload.post) {
        return;
      }
      const commentIndex = state.comments?.findIndex(
        comment => comment._id === action.payload.comment
      );
      if (commentIndex === undefined || commentIndex === -1) {
        return;
      }
      state.comments = state.comments?.filter(
        comment => comment._id !== action.payload.comment
      );
      if (state.post) state.post.commentsNum = action.payload.commentsNum;
    },

    updateLikes(state, action: PayloadAction<any>) {
      if (state.post?._id !== action.payload.post) {
        return;
      }
      if (state.post?.likesNum === undefined) {
        return;
      }

      state.post.likesNum = action.payload.likesNum;

      if (action.payload.isLiked !== undefined)
        state.post.isLiked = action.payload.isLiked;
    },
    updateSavePost(state, action: PayloadAction<any>) {
      if (state.post?._id !== action.payload.post) {
        return;
      }

      if (state.post) state.post.isSaved = action.payload.isSaved;
    },
  },
});

export const postDetailsActions = postDetailsSlice.actions;
export default postDetailsSlice.reducer;
