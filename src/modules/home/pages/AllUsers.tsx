import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import { useEffect, useState } from 'react';
import { getAllUsers } from '../store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import PopularUser from '../components/PopularUser';

import './AllUsers.scss';

const AllUsers = () => {
  const { t } = useTranslation();
  const {
    allUsers: users,
    pagination,
    isLoading: usersIsLoading,
  } = useSelector((state: RootState) => state.home);
  const [search, setSearch] = useSearchParams();

  const page = +pagination.page;
  const totalPages = +pagination.totalPages;

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(usersIsLoading);

  useEffect(() => {
    const searchObj = {
      limit: 15,
      sort: 'followersNum',
    };

    dispatch(getAllUsers(searchObj)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, search, setSearch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  return (
    <>
      <section className="all-users">
        {users.map(user => (
          <PopularUser key={user._id} {...user} />
        ))}
        {!users.length && <p className="no-users">{t('msg.noUsers')}</p>}
        {!!users.length && <Pagination page={page} totalPages={totalPages} />}
      </section>
    </>
  );
};

export default AllUsers;
