import { createSlice } from '@reduxjs/toolkit';

const mainLayoutSlice = createSlice({
  name: 'main',
  initialState: {
    isOptionsShown: false,
    isSideBarShown: false,
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
    toggleSideBar(state) {
      state.isSideBarShown = !state.isSideBarShown;
    },
    showSideBar(state) {
      state.isSideBarShown = true;
    },
    hideSideBar(state) {
      state.isSideBarShown = false;
    },
  },
});

export const mainLayoutActions = mainLayoutSlice.actions;
export default mainLayoutSlice.reducer;
