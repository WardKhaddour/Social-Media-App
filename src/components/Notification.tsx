import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { notificationActions } from '../store/notification';

import './Notification.scss';

const Notification = () => {
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

  const classes = `notification ${shown ? 'notification--shown' : ''} ${
    success ? 'notification--success' : 'notification--fail'
  }`;

  return ReactDOM.createPortal(
    <div className={classes}>{message}</div>,
    document.getElementById('notification-root')!
  );
};

export default Notification;
