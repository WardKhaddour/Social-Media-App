import { createSlice } from '@reduxjs/toolkit';

const homeLayoutSlice = createSlice({
  name: 'home',
  initialState: {
    isOptionsShown: false,
  },
  reducers: {
    toggleIsOptionsShown(state) {
      state.isOptionsShown = !state.isOptionsShown;
    },
    showOptions(state) {
      state.isOptionsShown = true;
    },
    hideOptions(state) {
      state.isOptionsShown = false;
    },
  },
});

export const homeLayoutActions = homeLayoutSlice.actions;
export default homeLayoutSlice.reducer;
