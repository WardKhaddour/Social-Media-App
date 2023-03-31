import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
import notificationSlice from './notification';
import homeLayoutSlice from 'layout/Home/store';

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    homeLayout: homeLayoutSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
