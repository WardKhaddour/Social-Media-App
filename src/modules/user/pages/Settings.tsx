import UpdateUserData from '../components/UpdateUserData';
import UpdatePassword from '../components/UpdatePassword';

import './Settings.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadingSpinner from 'components/LoadingSpinner';
import DeleteUser from '../components/DeleteUser';
import ConfirmEmail from '../components/ConfirmEmail';

const Settings = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);

  const { emailIsConfirmed } = useSelector(
    (state: RootState) => state.user.user
  );
  return (
    <div className="settings">
      {!emailIsConfirmed && <ConfirmEmail />}
      {!emailIsConfirmed && <div className="settings__separator"></div>}
      <LoadingSpinner loading={isLoading} />
      <UpdateUserData />
      <div className="settings__separator"></div>
      <UpdatePassword />
      <div className="settings__separator"></div>
      <DeleteUser />
    </div>
  );
};

export default Settings;
