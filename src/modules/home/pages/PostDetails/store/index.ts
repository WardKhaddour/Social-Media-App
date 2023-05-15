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
  },
});

export const postDetailsActions = postDetailsSlice.actions;
export default postDetailsSlice.reducer;
