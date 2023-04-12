import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { notificationActions } from '../store/notification';

import './Notification.scss';
import { useTranslation } from 'react-i18next';

const Notification = () => {
  const { i18n } = useTranslation();
  const { success, message, shown } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shown) {
        dispatch(notificationActions.hideNotification());
      }
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [shown, dispatch]);

  const classes = `notification  ${shown ? 'notification--shown' : ''} ${
    success ? 'notification--success' : 'notification--fail'
  }`;

  const root = document.getElementById('notification-root')!;

  if (i18n.language === 'ar') root.classList.add('rtl');
  else {
    root.classList.remove('rtl');
  }

  return ReactDOM.createPortal(<div className={classes}>{message}</div>, root);
};

export default Notification;
