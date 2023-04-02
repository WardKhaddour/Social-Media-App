import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { userActions } from './index';
import Services from './Services';
import { AnyAction } from 'redux';

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

export const logout = (): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  AnyAction
> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      await Services.logout();

      dispatch(userActions.reset());
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};
