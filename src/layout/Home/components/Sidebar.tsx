import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import { ReactComponent as IconSettings } from 'assets/icons/settings.svg';

import './Sidebar.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);
  const [sideBarShown, setSideBarShown] = useState(false);

  const toggleSideBar = () => {
    setSideBarShown(prevState => !prevState);
  };

  const sideBarClasses = `sidebar ${
    user.isAuthenticated ? '' : 'sidebar--hidden'
  } ${sideBarShown ? 'sidebar--hover__effect' : ''}`;

  return (
    <section className={sideBarClasses} onClick={toggleSideBar}>
      <ul className="sidebar__list">
        <Link className="sidebar__list-item" to="/settings">
          <span className="sidebar__list-item--label">
            {t('label.settings')}
          </span>
          <span className="sidebar__list-item--icon">
            <IconSettings />
          </span>
        </Link>
      </ul>
    </section>
  );
};

export default Sidebar;
