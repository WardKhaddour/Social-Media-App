import { allUsersActions } from './index';
import { HomeAction } from 'modules/home/types/HomeActions';
import Services from '../api/Services';
import { USER } from 'modules/home/interfaces/USER';

export const getAllUsers = (searchParams?: object): HomeAction<void> => {
  return async dispatch => {
    dispatch(allUsersActions.setIsLoading(true));
    try {
      const res = await Services.getAllUsers(searchParams);
      const {
        users,
        page,
        totalPages,
      }: {
        users: USER;
        totalPages: number;
        page: number;
      } = res.data;
      dispatch(
        allUsersActions.setUsersState({
          users,
          pagination: { page, totalPages },
        })
      );
    } catch (err) {
    } finally {
      dispatch(allUsersActions.setIsLoading(false));
    }
  };
};
