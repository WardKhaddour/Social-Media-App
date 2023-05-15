import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HOME_LAYOUT_STATE } from '../interfaces/HOME_LAYOUT_STATE';

const initialState: HOME_LAYOUT_STATE = {
  popularUsers: [],
  categories: [],
  isLoading: false,
  pagination: {
    page: 0,
    totalPages: 0,
  },
};

const homeLayoutSlice = createSlice({
  name: 'homeLayout',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPopularUsersState(state, action: PayloadAction<any>) {
      const { popularUsers, pagination } = action.payload;

      state.popularUsers = popularUsers;
      state.pagination = pagination;
    },
    setCategoriesState(state, action: PayloadAction<any>) {
      const { categories, pagination } = action.payload;
      state.categories = categories;
      state.pagination = pagination;
    },
  },
});

export const homeLayoutActions = homeLayoutSlice.actions;
export default homeLayoutSlice.reducer;
