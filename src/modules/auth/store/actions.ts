import Services from '../Services';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store';
import { authActions } from '.';

interface UserLoginData {
  email: string;
  password: string;
}

export const login = (
  userData: UserLoginData
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(authActions.setIsLoading(true));
    try {
      const data = await Services.login(userData);
      const { user } = data.data;

      dispatch(authActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(authActions.setIsLoading(false));
    }
  };
};

export const getUserData = (): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  AnyAction
> => {
  return async dispatch => {
    dispatch(authActions.setIsLoading(true));
    try {
      const data = await Services.getUserData();
      const { user } = data.data;

      dispatch(authActions.setUserData({ ...user, isAuthenticated: true }));
    } catch (err) {
      // console.log(err);
      return false;
    } finally {
      dispatch(authActions.setIsLoading(false));
    }
  };
};
