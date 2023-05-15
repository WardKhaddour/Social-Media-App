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
