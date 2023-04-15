import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { userActions } from 'store/user';
import Services from '../Services';
import { AnyAction } from 'redux';

type UserAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

interface UpdateUserData {
  name?: string;
  email?: string;
  photo?: File;
}
interface UpdateUserPassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export const confirmEmail = (userData: {
  token: string;
}): UserAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.confirmEmail(userData);
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

export const resendConfirmEmailToken = (userData: {
  email: string;
}): UserAction<boolean> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const res = await Services.resendConfirmEmailToken(userData);
      const { user } = res.data;

      dispatch(userActions.setUserData({ ...user, isAuthenticated: false }));

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const updateUserData = (
  userData: UpdateUserData | FormData
): UserAction<any> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const data = await Services.updateUserData(userData);
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

export const updateUserPassword = (
  userData: UpdateUserPassword
): UserAction<any> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const data = await Services.updateUserPassword(userData);
      const { user } = data.data;
      console.log(user);

      dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));

      return true;
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const deleteUser = (userData: { password: string }): UserAction<any> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      await Services.deleteUser(userData);

      dispatch(userActions.reset());
    } catch (err) {
      return false;
    } finally {
      dispatch(userActions.setIsLoading(false));
    }
  };
};

export const logout = (): UserAction<any> => {
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
