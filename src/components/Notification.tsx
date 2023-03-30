import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { uiActions } from '../store/ui';
const Notification = () => {
  const { success, message, shown } = useSelector(
    (state: RootState) => state.ui
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shown) {
        dispatch(uiActions.hideNotification());
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
