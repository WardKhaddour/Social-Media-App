import Services from '../Services';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { userActions } from 'store/user';

interface UserLoginData {
  email: string;
  password: string;
}

export const login = (
  userData: UserLoginData
): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> => {
  return async dispatch => {
    dispatch(userActions.setIsLoading(true));
    try {
      const data = await Services.login(userData);
      const { user } = data.data;

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
