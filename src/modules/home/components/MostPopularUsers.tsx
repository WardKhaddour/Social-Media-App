import { Link } from 'react-router-dom';

import './MostPopularUsers.scss';
import PopularUser from './PopularUser';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const MostPopularUsers = ({ className }: { className: string }) => {
  const { popularUsers } = useSelector((state: RootState) => state.home);

  return (
    <>
      <h2 className={`${className}__header`}>Recommended Users</h2>
      <ul className={className}>
        {popularUsers.map(user => (
          <PopularUser key={user._id} {...user} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-users">
        See All
      </Link>
    </>
  );
};

export default MostPopularUsers;
