import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SAVED_POSTS_STATE } from 'modules/home/interfaces/SAVED_POSTS_STATE';

const initialState: SAVED_POSTS_STATE = {
  isLoading: false,
  savedPosts: [],
};

const savedPostsSlice = createSlice({
  name: 'savedPosts',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSavedPostsState(state, action: PayloadAction<any>) {
      const { posts } = action.payload;

      state.savedPosts = posts;
    },
  },
});

export const savedPostsActions = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
