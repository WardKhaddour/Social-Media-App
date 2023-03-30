import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  user: UserData;
}

interface UserData {
  isAuthenticated: boolean;
  email: string;
  name: string;
}

const initialState: IState = {
  isLoading: false,
  user: {
    isAuthenticated: false,
    email: '',
    name: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
