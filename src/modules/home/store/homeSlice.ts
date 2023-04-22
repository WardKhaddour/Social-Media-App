import {
  IPOST,
  IUSERS,
  ICATEGORIES,
  ICOMMENT,
  IUSERS_DETAILS,
} from './actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HOME_STATE {
  isLoading: boolean;
  posts: IPOST[];
  popularUsers: IUSERS[];
  categories: ICATEGORIES[];
  currentPost?: IPOST;
  commentsOnPost?: ICOMMENT[];
  userProfileDetails?: IUSERS_DETAILS;
}

const initialState: HOME_STATE = {
  isLoading: false,
  posts: [],
  popularUsers: [],
  categories: [],
  currentPost: undefined,
  commentsOnPost: undefined,
  userProfileDetails: undefined,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setPosts(state, action: PayloadAction<any>) {
      state.posts = action.payload;
    },
    setPopularUsers(state, action: PayloadAction<any>) {
      state.popularUsers = action.payload;
    },
    setCategories(state, action: PayloadAction<any>) {
      state.categories = action.payload;
    },
    setCurrentPost(state, action: PayloadAction<any>) {
      state.currentPost = action.payload;
    },
    setCommentsOnPost(state, action: PayloadAction<any>) {
      state.commentsOnPost = action.payload;
    },
    setUserProfileDetails(state, action: PayloadAction<any>) {
      state.userProfileDetails = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;
