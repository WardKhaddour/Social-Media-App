import { combineReducers } from '@reduxjs/toolkit';
import allUsersReducer from '../pages/AllUsers/store';
import postsReduces from '../pages/Posts/store';
import postDetailsReducer from '../pages/PostDetails/store';
import savedItemsReducer from '../pages/SavedItems/store';
import userProfileReducer from '../pages/UserProfile/store';
import homeLayoutReducer from './homeSlice';
const homeSlice = combineReducers({
  homeLayout: homeLayoutReducer,
  allUsers: allUsersReducer,
  posts: postsReduces,
  postDetails: postDetailsReducer,
  savedItems: savedItemsReducer,
  userProfile: userProfileReducer,
});

export default homeSlice;
