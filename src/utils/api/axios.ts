import axios, { RawAxiosRequestHeaders } from 'axios';
import router from 'router';
import store from 'store';
import { notificationActions } from 'store/notification';
import langHelper from 'utils/language/LangHelper';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    lang: langHelper.getLang(),
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers = { ...config.headers } as RawAxiosRequestHeaders;
    config.headers.lang = langHelper.getLang();
    return config;
  },
  err => {
    console.log(err);
  }
);

axiosInstance.interceptors.response.use(
  res => {
    const { message } = res.data;
    if (!message) {
      return res;
    }
    store.dispatch(notificationActions.showNotification());
    store.dispatch(
      notificationActions.setNotificationContent({ message, success: true })
    );
    return res;
  },
  err => {
    const url = err.config.url;
    const { message } = err.response.data;
    if (!message) {
      return Promise.reject(err);
    }
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
