import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_PROFILE_STATE } from 'modules/home/interfaces/USER_PROFILE_STATE';

const initialState: USER_PROFILE_STATE = {
  isLoading: false,
  followsIsLoading: false,
  userProfileDetails: undefined,
  followStats: undefined,
  followers: [],
  followings: [],
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setFollowsIsLoading(state, action: PayloadAction<boolean>) {
      state.followsIsLoading = action.payload;
    },
    setUserProfileDetails(state, action: PayloadAction<any>) {
      const { userProfileDetails } = action.payload;
      state.userProfileDetails = userProfileDetails;
    },

    setFollowStatsShown(state, action: PayloadAction<any>) {
      state.followStats = action.payload;
    },

    setFollowers(state, action: PayloadAction<any>) {
      state.followers = action.payload;
    },
    setFollowings(state, action: PayloadAction<any>) {
      state.followings = action.payload;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
