import { Link } from 'react-router-dom';

import './UsersToFollow.scss';
import RecommendedUser from './RecommendedUser';

const UsersToFollow = ({ className }: { className: string }) => {
  const usersToFollow = [
    {
      name: 'Ward',
      photo: 'http://localhost:8000/images/users/default-user-photo.png',
      bio: 'Javascript devloper',
      id: '12442',
    },
    {
      name: 'Ward',
      photo: 'http://localhost:8000/images/users/default-user-photo.png',
      bio: 'Javascript devloper',
      id: '12442',
    },
  ];
  return (
    <>
      <h2 className={`${className}__header`}>Recommended Users</h2>
      <ul className={className}>
        {usersToFollow.map(user => (
          <RecommendedUser key={user.id} {...user} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-users">
        See All
      </Link>
    </>
  );
};

export default UsersToFollow;
