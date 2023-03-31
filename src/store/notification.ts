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

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state) {
      state.shown = true;
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

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
