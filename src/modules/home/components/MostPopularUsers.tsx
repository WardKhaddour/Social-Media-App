import { Link } from 'react-router-dom';

import './MostPopularUsers.scss';
import PopularUser from './PopularUser';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

const MostPopularUsers = ({ className }: { className: string }) => {
  const { popularUsers } = useSelector(
    (state: RootState) => state.home.homeLayout
  );
  const { t } = useTranslation();
  console.log(popularUsers);

  return (
    <>
      <h2 className={`${className}__header`}>{t('label.recommendedUsers')}</h2>
      <ul className={className}>
        {popularUsers.map(user => (
          <PopularUser key={user._id} {...user} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-users">
        {t('action.seeAll')}
      </Link>
    </>
  );
};

export default MostPopularUsers;
