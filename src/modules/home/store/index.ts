import { combineReducers } from '@reduxjs/toolkit';
import allUsersReducer from '../pages/AllUsers/store';
import postsReduces, { postsActions } from '../pages/Posts/store';
import postDetailsReducer from '../pages/PostDetails/store';
import savedItemsReducer from '../pages/SavedItems/store';
import userProfileReducer from '../pages/UserProfile/store';
import homeLayoutReducer from './homeSlice';
import store from 'store';

const homeSlice = combineReducers({
  homeLayout: homeLayoutReducer,
  allUsers: allUsersReducer,
  posts: postsReduces,
  postDetails: postDetailsReducer,
  savedItems: savedItemsReducer,
  userProfile: userProfileReducer,
});

// store.dispatch(postsActions)

export default homeSlice;
