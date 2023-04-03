import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { userActions } from './index';
import Services from './Services';
import { AnyAction } from 'redux';

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

export const updateUserData = (
  userData: UpdateUserData | FormData
): ThunkAction<Promise<any>, RootState, unknown, AnyAction> => {
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
): ThunkAction<Promise<any>, RootState, unknown, AnyAction> => {
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

export const deleteUser = (userData: {
  password: string;
}): ThunkAction<Promise<any>, RootState, unknown, AnyAction> => {
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
