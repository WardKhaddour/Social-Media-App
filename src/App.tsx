import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Notification from './components/Notification';
import { getUserData } from './store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import LoadingSpinner from './components/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import router from 'router';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();
  const { isLoading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  const appClasses = i18n.language === 'ar' ? 'App rtl' : 'App';

  return (
    <div className={appClasses}>
      <Notification />
      <Suspense fallback={<LoadingSpinner loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
