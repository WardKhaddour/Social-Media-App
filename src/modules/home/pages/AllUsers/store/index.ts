import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USERS_STATE } from 'modules/home/interfaces/USERS_STATE';

const initialState: USERS_STATE = {
  isLoading: false,
  pagination: { page: 0, totalPages: 0 },
  users: [],
};

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUsersState(state, action: PayloadAction<any>) {
      const { pagination, users } = action.payload;
      state.pagination = pagination;
      state.users = users;
    },
  },
});

export const allUsersActions = allUsersSlice.actions;
export default allUsersSlice.reducer;
