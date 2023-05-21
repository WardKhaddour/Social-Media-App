import { userProfileActions } from './index';
import { HomeAction } from '../../../types/HomeActions';
import Services from '../api/Services';

export const getUserProfileDetails = (userId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(userProfileActions.setIsLoading(true));

    try {
      const res = await Services.getUserDetails(userId);
      const { user: userProfileDetails } = res.data;
      dispatch(
        userProfileActions.setUserProfileDetails({ userProfileDetails })
      );
    } catch (err) {
    } finally {
      dispatch(userProfileActions.setIsLoading(false));
    }
  };
};

export const followUser = (userId: string): HomeAction<void> => {
  return async dispatch => {
    try {
      await Services.followUser(userId);
    } catch (err) {}
  };
};

export const getFollowers = (userId: string): HomeAction<void> => {
  return async dispatch => {
    dispatch(userProfileActions.setFollowsIsLoading(true));
    try {
      const res = await Services.getFollowers(userId);
      dispatch(userProfileActions.setFollowsIsLoading(false));
      dispatch(userProfileActions.setFollowers(res.data.followers));
    } catch (err) {
      dispatch(userProfileActions.setFollowsIsLoading(false));
    }
  };
};

export const getFollowing = (userId: string): HomeAction<void> => {
  return async dispatch => {
    try {
      dispatch(userProfileActions.setFollowsIsLoading(true));
      const res = await Services.getFollowing(userId);
      dispatch(userProfileActions.setFollowsIsLoading(false));
      dispatch(userProfileActions.setFollowings(res.data.following));
    } catch (err) {
      dispatch(userProfileActions.setFollowsIsLoading(false));
    }
  };
};
