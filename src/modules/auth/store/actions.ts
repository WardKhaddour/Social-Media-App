import Services from '../Services';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { userActions } from 'store/user';

type AuthAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

interface UserLoginData {
  email: string;
  password: string;
  recaptchaToken: string;
}

interface UserSignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaToken: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export const login = (userData: UserLoginData): AuthAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.login(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const signup = (userData: UserSignupData): AuthAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.signup(userData);
      const { user } = res.data;
      console.log(user);
      dispatch(userActions.setUserData({ ...user, isAuthenticated: false }));

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const forgotPassword = (userData: {
  email: string;
  recaptchaToken: string;
}): AuthAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      await Services.forgotPassword(userData);

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const resetPassword = (
  userData: ResetPasswordData
): AuthAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.resetPassword(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};
