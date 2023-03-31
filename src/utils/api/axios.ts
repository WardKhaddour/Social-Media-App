import axios from 'axios';
import store from 'store';
import { notificationActions } from 'store/notification';
let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  res => {
    const { message } = res.data;
    store.dispatch(notificationActions.showNotification());
    store.dispatch(
      notificationActions.setNotificationContent({ message, success: true })
    );
    return res;
  },
  err => {
    if (err.config.url === '/user/' || err.config.url === '/user') {
      return Promise.reject(err.message);
    }
    const { message } = err.response.data;
    store.dispatch(notificationActions.showNotification());
    store.dispatch(
      notificationActions.setNotificationContent({ message, success: false })
    );
    return Promise.reject(err.message);
  }
);

export { axiosInstance };
