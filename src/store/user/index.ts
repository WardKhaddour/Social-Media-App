import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  user: UserData;
}

interface UserData {
  _id: string;
  isAuthenticated: boolean;
  email: string;
  name: string;
  photo: string;
  emailIsConfirmed: boolean;
  hasPhoto: boolean;
}

const initialState: IState = {
  isLoading: false,
  user: {
    _id: '',
    isAuthenticated: false,
    email: '',
    name: '',
    photo: '',
    emailIsConfirmed: false,
    hasPhoto: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },

    reset(state) {
      state.user = {
        _id: '',
        name: '',
        email: '',
        photo: '',
        isAuthenticated: false,
        emailIsConfirmed: false,
        hasPhoto: false,
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
