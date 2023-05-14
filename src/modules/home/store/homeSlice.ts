import {
  IPOST,
  IUSERS,
  ICATEGORIES,
  ICOMMENT,
  IUSERS_DETAILS,
  IPostsPagination,
} from '../interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import './socket';
interface HOME_STATE {
  isLoading: boolean;
  posts: IPOST[];
  pagination: IPostsPagination;
  savedPosts: IPOST[];
  popularUsers: IUSERS[];
  allUsers: IUSERS[];
  categories: ICATEGORIES[];
  currentPost?: IPOST;
  commentsOnPost?: ICOMMENT[];
  userProfileDetails?: IUSERS_DETAILS;
}

const initialState: HOME_STATE = {
  isLoading: false,
  posts: [],
  pagination: { page: 0, totalPages: 0 },
  savedPosts: [],
  popularUsers: [],
  allUsers: [],
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
      if (state.currentPost?._id === action.payload._id) {
        state.currentPost = action.payload;
      }
    },
    deletePost(state, action: PayloadAction<any>) {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
    sePagination(state, action: PayloadAction<any>) {
      state.pagination = action.payload;
    },

    setSavedPosts(state, action: PayloadAction<any>) {
      state.savedPosts = action.payload;
    },
    setPopularUsers(state, action: PayloadAction<any>) {
      state.popularUsers = action.payload;
    },
    setAllUsers(state, action: PayloadAction<any>) {
      state.allUsers = action.payload;
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
