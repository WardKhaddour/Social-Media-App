import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
import notificationSlice from './notification';
import mainLayoutSlice from 'layout/Main/store';

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    mainLayout: mainLayoutSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
