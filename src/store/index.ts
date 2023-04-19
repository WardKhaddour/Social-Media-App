import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
import notificationSlice from './notification';
import mainLayoutSlice from 'layout/Main/store';
import homeSlice from 'modules/home/store/homeSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    home: homeSlice,
    notification: notificationSlice,
    mainLayout: mainLayoutSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
