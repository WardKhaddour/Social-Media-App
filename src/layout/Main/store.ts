import { createSlice } from '@reduxjs/toolkit';

const mainLayoutSlice = createSlice({
  name: 'main',
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

export const mainLayoutActions = mainLayoutSlice.actions;
export default mainLayoutSlice.reducer;
