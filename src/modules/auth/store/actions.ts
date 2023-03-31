import Services from '../Services';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { userActions } from 'store/user';

interface UserLoginData {
  email: string;
  password: string;
}

interface UserSignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export const login = (
  userData: UserLoginData
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.login(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const signup = (
  userData: UserSignupData
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.signup(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const forgotPassword = (userData: {
  email: string;
}): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      await Services.forgotPassword(userData);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const resetPassword = (
  userData: ResetPasswordData
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.resetPassword(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};
