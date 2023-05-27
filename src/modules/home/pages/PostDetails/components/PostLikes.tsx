import Backdrop from 'components/Backdrop';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useEffect } from 'react';

import './PostLikes.scss';
import PopularUser from 'modules/home/components/PopularUser';
import { postDetailsActions } from '../store';
import { getPostLikes } from '../store/actions';
import { useTranslation } from 'react-i18next';

interface Props {
  postId: string;
}

const PostLikes = ({ postId }: Props) => {
  const { t } = useTranslation();
  const { isLoading, likes } = useSelector(
    (state: RootState) => state.home.postDetails
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPostLikes(postId));
  }, [postId, dispatch]);

  const handleHideLikes = () => {
    dispatch(postDetailsActions.setIsLikesShown(false));
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className="" onClick={handleHideLikes}>
          <>
            {isLoading && <div className="loading-spinner"></div>}
            {!isLoading && (
              <div
                className="post-likes"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <h2 className="post-likes__title">{t('label.likedBy')}</h2>
                {likes?.map(like => (
                  <li key={like._id}>
                    <PopularUser {...like.user} onView={handleHideLikes} />
                  </li>
                ))}
              </div>
            )}
          </>
        </Backdrop>,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default PostLikes;
