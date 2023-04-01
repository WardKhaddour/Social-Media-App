import axios from 'axios';
import router from 'routes';
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
    const url = err.config.url;
    const { message } = err.response.data;

    if (url === '/user' && message !== 'Please confirm your email first') {
      return Promise.reject(err.message);
    }

    store.dispatch(notificationActions.showNotification());
    store.dispatch(
      notificationActions.setNotificationContent({ message, success: false })
    );
    if (message === 'Please confirm your email first') {
      router.navigate('/auth/confirm-email');
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };
