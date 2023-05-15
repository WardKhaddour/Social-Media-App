import { HomeAction } from 'modules/home/types/HomeActions';
import { homeLayoutActions } from './homeSlice';
import Services from '../Services';

import { CATEGORY } from 'modules/home/interfaces/CATEGORY';

export const getAllCategories = (searchParams?: object): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeLayoutActions.setIsLoading(true));
    try {
      const res = await Services.getCategories(searchParams);
      const {
        categories,
        page,
        totalPages,
      }: {
        categories: CATEGORY;
        totalPages: number;
        page: number;
      } = res.data;

      dispatch(
        homeLayoutActions.setCategoriesState({
          categories,
          pagination: { page, totalPages },
        })
      );
    } catch (err) {
    } finally {
      dispatch(homeLayoutActions.setIsLoading(false));
    }
  };
};

export const mostPopularUsers = (): HomeAction<void> => {
  return async dispatch => {
    dispatch(homeLayoutActions.setIsLoading(true));
    try {
      const res = await Services.getMostPopularUsers();
      const { users } = res.data;

      dispatch(
        homeLayoutActions.setPopularUsersState({
          popularUsers: users,
        })
      );
    } catch (err) {
    } finally {
      dispatch(homeLayoutActions.setIsLoading(false));
    }
  };
};
