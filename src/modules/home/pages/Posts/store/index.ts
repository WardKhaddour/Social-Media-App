import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POSTS_STATE } from 'modules/home/interfaces/POSTS_STATE';

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
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
