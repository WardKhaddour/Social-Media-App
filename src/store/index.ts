import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/auth/store';
import uiSlice from './ui';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
