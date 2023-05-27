import Backdrop from 'components/Backdrop';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { userProfileActions } from '../store';
import { useEffect } from 'react';
import { followUser, getFollowers, getFollowing } from '../store/actions';

import './UserFollows.scss';
import { useTranslation } from 'react-i18next';
import PopularUser from 'modules/home/components/PopularUser';

interface Props {
  userId: string;
}

const UsersFollow = ({ userId }: Props) => {
  const { t } = useTranslation();
  const {
    followStats,
    followsIsLoading: isLoading,
    followers,
    followings,
  } = useSelector((state: RootState) => state.home.userProfile);
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (followStats?.type === 'followers') {
      dispatch(getFollowers(userId));
    } else if (followStats?.type === 'followings') {
      dispatch(getFollowing(userId));
    }
  }, [userId, dispatch, followStats?.type]);

  const handleHideFollows = () => {
    dispatch(
      userProfileActions.setFollowStatsShown({
        shown: false,
        type: '',
      })
    );
  };

  const handleChangeFollows = (type: string) => () => {
    dispatch(
      userProfileActions.setFollowStatsShown({
        shown: true,
        type,
      })
    );
  };

  const handleToggleFollow = (id: string) => async () => {
    await dispatch(followUser(id));
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className="" onClick={handleHideFollows}>
          <>
            {isLoading && <div className="loading-spinner"></div>}
            {!isLoading && (
              <div
                className="user-follows"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <div className="user-follows__nav">
                  <button
                    type="button"
                    className={
                      followStats?.type === 'followers'
                        ? 'btn btn-primary'
                        : 'btn btn-secondary'
                    }
                    onClick={handleChangeFollows('followers')}
                  >
                    {t('label.followers')}
                  </button>
                  <button
                    type="button"
                    className={
                      followStats?.type === 'followings'
                        ? 'btn btn-primary'
                        : 'btn btn-secondary'
                    }
                    onClick={handleChangeFollows('followings')}
                  >
                    {t('label.following')}
                  </button>
                </div>
                {followStats?.type === 'followers' && (
                  <div className="user-follows__followers">
                    {followers?.map(follower => (
                      <li key={follower._id}>
                        <PopularUser
                          {...follower.user}
                          withFollowing={isAuthenticated}
                          onToggleFollow={handleToggleFollow(follower.user._id)}
                          isFollowing={follower.isFollowing}
                          onView={handleHideFollows}
                        />
                      </li>
                    ))}
                  </div>
                )}
                {followStats?.type === 'followings' && (
                  <div className="user-follows__followings">
                    {followings?.map(following => (
                      <li key={following._id}>
                        <PopularUser
                          {...following.user}
                          withFollowing={isAuthenticated}
                          onToggleFollow={handleToggleFollow(
                            following.user._id
                          )}
                          isFollowing={following.isFollowing}
                        />
                      </li>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        </Backdrop>,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default UsersFollow;
