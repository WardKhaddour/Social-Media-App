import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const [, setSearch] = useSearchParams();

  const getNextPage = () => {
    if (page >= totalPages) {
      return;
    }
    setSearch(prev => {
      prev.set('page', `${page + 1}`);
      return prev;
    });
  };
  const getLastPage = () => {
    setSearch(prev => {
      prev.set('page', `${totalPages}`);
      return prev;
    });
  };

  const getPrevPage = () => {
    if (page <= 1) {
      return;
    }
    setSearch(prev => {
      prev.set('page', `${page - 1}`);
      return prev;
    });
  };
  const getFirstPage = () => {
    setSearch(prev => {
      prev.set('page', '1');
      return prev;
    });
  };
  return (
    <div className="pagination">
      {page > 1 && (
        <>
          <button className="pagination__prev" onClick={getFirstPage}>
            &lt;&lt;
          </button>
          <button className="pagination__prev" onClick={getPrevPage}>
            &lt;
          </button>
        </>
      )}
      <span className="pagination__page">{page}</span>
      <span>/</span>
      <span className="pagination__total">{totalPages}</span>
      {page < totalPages && (
        <>
          <button className="pagination__next" onClick={getNextPage}>
            &gt;
          </button>
          <button className="pagination__next" onClick={getLastPage}>
            &gt;&gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
