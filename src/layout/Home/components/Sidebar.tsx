import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import { ReactComponent as IconSettings } from 'assets/icons/settings.svg';

import './Sidebar.scss';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation('translation', { useSuspense: true });
  const { user } = useSelector((state: RootState) => state.user);

  const sideBarClasses = user.isAuthenticated ? 'sidebar' : 'sidebar--hidden';

  return (
    <section className={sideBarClasses}>
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
