import { MouseEvent, useState } from 'react';
import './FilterPosts.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const SortPosts = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortAsc, setSortAsc] = useState(
    !searchParams.get('sort')?.startsWith('-')
  );
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  const sortOptions = [
    {
      name: t('label.sortOptionsDate'),
      query: 'publishedAt',
    },
    {
      name: t('label.sortOptionsLike'),
      query: 'likesNum',
    },
    {
      name: t('label.sortOptionsComment'),
      query: 'commentsNum',
    },
  ];

  const toggleShowOptions = () => {
    setIsOptionsShown(prevState => !prevState);
  };

  const toggleSortDir = () => {
    setSearchParams(prev => {
      const sort = prev.get('sort');
      if (!sort) {
        return prev;
      }
      setSortAsc(prevState => !prevState);

      if (sort.startsWith('-')) {
        prev.set('sort', `${prev.get('sort')?.split('-')[1]}` || '');
      } else {
        prev.set('sort', `-${prev.get('sort')}` || '');
      }
      return prev;
    });
  };

  const handleSortPosts = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'LI' || !target.dataset.option) {
      return;
    }
    setSearchParams(prev => {
      prev.set('sort', target.dataset.option!);
      return prev;
    });
  };

  const optionsClasses = isOptionsShown
    ? 'sort-posts__options sort-posts__options--shown'
    : 'sort-posts__options';
  return (
    <div className="sort-posts">
      <div className="sort-posts__actions">
        <button
          className="sort-posts__button btn btn-secondary"
          type="button"
          onClick={toggleShowOptions}
        >
          {t('action.sortPosts')}
        </button>
        <button
          type="button"
          className="sort-posts__dir btn btn-secondary"
          onClick={toggleSortDir}
        >
          {sortAsc ? <>&darr;</> : <>&uarr;</>}
        </button>
      </div>
      <ul className={optionsClasses} onClick={handleSortPosts}>
        {sortOptions.map(option => (
          <li
            key={option.name}
            data-option={option.query}
            className="sort-posts__option"
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortPosts;
