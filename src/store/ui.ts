import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  message: string;
  success: boolean;
  shown: boolean;
}

const initialState: IState = {
  message: '',
  success: true,
  shown: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification(state) {
      state.shown = true;
      console.log('Hellooo');
    },
    hideNotification(state) {
      state.shown = false;
    },
    setNotificationContent(
      state,
      action: PayloadAction<{ success: boolean; message: string }>
    ) {
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
