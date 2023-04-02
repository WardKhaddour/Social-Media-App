import UpdateUserData from '../components/UpdateUserData';
import UpdatePassword from '../components/UpdatePassword';

import './Settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <UpdateUserData />
      <div className="settings__separator"></div>
      <UpdatePassword />
    </div>
  );
};

export default Settings;
