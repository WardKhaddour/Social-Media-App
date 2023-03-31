import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Notification from './components/Notification';
import { getUserData } from './store/user/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserData()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  return (
    <div className="App">
      <Notification />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
