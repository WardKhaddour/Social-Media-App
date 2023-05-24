import axios, { RawAxiosRequestHeaders } from 'axios';
import { BASE_URL } from '../../constants';
import router from 'router';
import socket from 'socket';
import store from 'store';
import { notificationActions } from 'store/notification';
import langHelper from 'utils/language/LangHelper';
import localStorageHelper from 'utils/localStorage';

let baseURL = `${BASE_URL}/api/v1`;

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
    config.headers.socketId = socket.id;
    if (localStorageHelper.getToken()) {
      config.headers.Authorization = `Bearer ${localStorageHelper.getToken()}`;
    }

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
