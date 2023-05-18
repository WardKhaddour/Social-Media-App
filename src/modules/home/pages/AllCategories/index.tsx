import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import { useEffect, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import './index.scss';
import CategoryItem from '../../components/CategoryItem';
import { getAllCategories } from 'modules/home/store/actions';

const AllCategories = () => {
  const { t } = useTranslation();
  const {
    categories,
    pagination,
    isLoading: categoriesIsLoading,
  } = useSelector((state: RootState) => state.home.homeLayout);
  const [search, setSearch] = useSearchParams();

  const page = +(pagination?.page || 1);
  const totalPages = +(pagination?.totalPages || 1);

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(categoriesIsLoading);

  useEffect(() => {
    const searchObj = Object.fromEntries(new URLSearchParams(search));

    searchObj.limit = '15';
    searchObj.sort = 'name';
    dispatch(getAllCategories(searchObj)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, search, setSearch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  return (
    <>
      <h2 className="heading-primary all-categories__heading">
        {t('label.categories')}
      </h2>
      <section className="all-categories">
        {categories.map(user => (
          <CategoryItem key={user._id} {...user} />
        ))}
        {!categories.length && (
          <p className="no-categories">{t('msg.noCategories')}</p>
        )}
        {!!categories.length && (
          <Pagination page={page} totalPages={totalPages} />
        )}
      </section>
    </>
  );
};

export default AllCategories;
