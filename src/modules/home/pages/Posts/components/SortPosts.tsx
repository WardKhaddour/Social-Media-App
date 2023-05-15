import { MouseEvent, useState } from 'react';
import './FilterPosts.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './SortPosts.scss';

const SortPosts = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState({
    sortAcs: !searchParams.get('sort')?.startsWith('-'),
    isOptionsShown: false,
    sortOptions: [
      {
        name: t('label.sortOptionsDate'),
        query: 'publishedAt',
        selected: true,
      },
      {
        name: t('label.sortOptionsLike'),
        query: 'likesNum',
        selected: false,
      },
      {
        name: t('label.sortOptionsComment'),
        query: 'commentsNum',
        selected: false,
      },
    ],
  });

  const toggleShowOptions = () => {
    setState(prevState => ({
      ...prevState,
      isOptionsShown: !prevState.isOptionsShown,
    }));
  };

  const toggleSortDir = () => {
    setSearchParams(prev => {
      const sort = prev.get('sort');
      if (!sort) {
        return prev;
      }
      setState(prevState => ({
        ...prevState,
        sortAcs: !prevState.sortAcs,
      }));
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

    setState(prevState => {
      const newState = { ...prevState };
      newState.isOptionsShown = !newState.isOptionsShown;
      const selectedOptionIndex = prevState.sortOptions.findIndex(
        option => option.query === target.dataset.option!
      );
      if (selectedOptionIndex !== -1) {
        newState.sortOptions.forEach((el, index) => {
          if (index === selectedOptionIndex) {
            el.selected = true;
          } else {
            el.selected = false;
          }
        });
      }
      return newState;
    });
    setSearchParams(prev => {
      prev.set('sort', target.dataset.option!);
      return prev;
    });
  };

  const optionsClasses = state.isOptionsShown
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
          {state.sortAcs ? <>&darr;</> : <>&uarr;</>}
        </button>
      </div>
      <ul className={optionsClasses} onClick={handleSortPosts}>
        {state.sortOptions.map(option => (
          <li
            key={option.name}
            data-option={option.query}
            data-selected={option.selected}
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
