import axios from 'axios';
import store from '../../store';
import { uiActions } from '../../store/ui';
let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8000/api/v1/';
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  res => {
    const { message } = res.data;
    store.dispatch(uiActions.showNotification());
    store.dispatch(
      uiActions.setNotificationContent({ message, success: true })
    );
    return res;
  },
  err => {
    if (err.config.url === '/user/') {
      return Promise.reject(err.message);
    }
    const { message } = err.response.data;
    store.dispatch(uiActions.showNotification());
    store.dispatch(
      uiActions.setNotificationContent({ message, success: false })
    );
    return Promise.reject(err.message);
  }
);

export { axiosInstance };
