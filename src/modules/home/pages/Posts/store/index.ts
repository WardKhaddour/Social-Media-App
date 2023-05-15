import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POSTS_STATE } from 'modules/home/interfaces/POSTS_STATE';
import '../socket';

const initialState: POSTS_STATE = {
  isLoading: false,
  pagination: { page: 0, totalPages: 0 },
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPostsState(state, action: PayloadAction<any>) {
      const { pagination, posts } = action.payload;
      state.pagination = pagination;
      state.posts = posts;
    },

    addNewPost(state, action: PayloadAction<any>) {
      if (!state.posts.some(post => post._id === action.payload._id)) {
        state.posts.unshift(action.payload);
      }
    },

    updatePost(state, action: PayloadAction<any>) {
      const postIndex = state.posts.findIndex(
        post => post._id === action.payload._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
    },

    deletePost(state, action: PayloadAction<any>) {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
