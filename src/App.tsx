import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Notification from './components/Notification';
import { getUserData } from './store/user/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import LoadingSpinner from './components/LoadingSpinner';
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(getUserData()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  const appClasses = i18n.language === 'ar' ? 'App rtl' : 'App';

  return (
    <div className={appClasses}>
      <Notification />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
