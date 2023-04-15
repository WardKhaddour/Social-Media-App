import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { userActions } from './index';
import Services from './Services';
import { AnyAction } from 'redux';

interface UpdateUserPhoto {
  photo?: File;
}

export const getUserData = (): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  AnyAction
> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const data = await Services.getUserData();
      const { user } = data.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));
    } catch (err: any) {
      const user = err?.response?.data?.data?.user;
      if (user)
        dispatch(userActions.setUserData({ ...user, isAuthenticated: false }));

      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const updateUserPhoto = (
  userData: UpdateUserPhoto | FormData
): ThunkAction<Promise<any>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const data = await Services.updateUserPhoto(userData);
      const { user } = data.data;
      console.log(user);

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};
