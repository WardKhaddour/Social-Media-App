import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_PROFILE_STATE } from 'modules/home/interfaces/USER_PROFILE_STATE';

const initialState: USER_PROFILE_STATE = {
  isLoading: false,
  userProfileDetails: undefined,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUserProfileDetails(state, action: PayloadAction<any>) {
      const { userProfileDetails } = action.payload;
      state.userProfileDetails = userProfileDetails;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
