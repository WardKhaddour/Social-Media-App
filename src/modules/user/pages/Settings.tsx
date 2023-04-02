import UpdateUserData from '../components/UpdateUserData';
import UpdatePassword from '../components/UpdatePassword';

import './Settings.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadingSpinner from 'components/LoadingSpinner';

const Settings = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  return (
    <div className="settings">
      <LoadingSpinner loading={isLoading} />
      <UpdateUserData />
      <div className="settings__separator"></div>
      <UpdatePassword />
    </div>
  );
};

export default Settings;
