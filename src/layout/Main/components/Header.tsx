import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store';
import AppLink from 'components/AppLink';
import { mainLayoutActions } from '../store';
import { logout } from 'modules/user/store/actions';
import { ReactComponent as IconLogout } from 'assets/icons/logout.svg';
import { ReactComponent as IconCategories } from 'assets/icons/category.svg';
import { ReactComponent as IconHome } from 'assets/icons/home.svg';
import { ReactComponent as IconUsers } from 'assets/icons/users.svg';
import './Header.scss';
import { MouseEventHandler } from 'react';
import ToggleLanguage from './ToggleLanguage';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import NavItem from './NavItem';

const AuthenticatedHeader = (props: { name: string; photo: string }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isOptionsShown } = useSelector(
    (state: RootState) => state.mainLayout
  );
  // const [isOptionsShown, setIsOptionsShown] = useState(false);

  const toggleOptions = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    dispatch(mainLayoutActions.toggleIsOptionsShown());
    // setIsOptionsShown(prevState => !prevState);
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const optionsClasses = isOptionsShown
    ? 'header__user-options header__user-options--shown'
    : 'header__user-options';

  return (
    <>
      <div className="header__user">
        <Link to="me" className="header__user-name">
          {props.name}
        </Link>
        <span className="header__user-photo" onClick={toggleOptions}>
          <img crossOrigin="anonymous" src={props.photo} alt={props.name} />
        </span>
        <ul className={optionsClasses}>
          <li className="header__user-option" onClick={logoutHandler}>
            <span className="header__user-option--label">
              {t('action.logout')}
            </span>
            <span className="header__user-option--icon">
              <IconLogout />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

const UnAuthenticatedHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="header__actions">
      <AppLink
        className="header__action header__action--signup"
        toPage={t('action.signup')}
        isPrimary={false}
        link="/auth/signup"
      />
      <AppLink
        className="header__action"
        toPage={t('action.login')}
        isPrimary={true}
        link="/auth/"
      />
    </div>
  );
};

const Header = (props: { onClick: MouseEventHandler<HTMLElement> }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);

  const navLinks = [
    {
      id: 1,
      label: t('label.home'),
      to: '/',
      icon: <IconHome />,
    },
    {
      id: 2,
      label: t('label.recommendedUsers'),
      to: '/all-users',
      icon: <IconUsers />,
    },
    {
      id: 3,
      label: t('label.allCategories'),
      to: '/all-categories',
      icon: <IconCategories />,
    },
  ];

  const content = user.isAuthenticated ? (
    <AuthenticatedHeader name={user.name} photo={user.photo} />
  ) : (
    <UnAuthenticatedHeader />
  );
  return (
    <header className="header" onClick={props.onClick}>
      <nav className="header__nav">
        <div className="header__logo-lang">
          <ToggleLanguage />
        </div>
        <ul className="header__nav--links">
          {navLinks.map(link => (
            <NavItem key={link.id} {...link} />
          ))}
        </ul>
        {content}
      </nav>
    </header>
  );
};

export default Header;
