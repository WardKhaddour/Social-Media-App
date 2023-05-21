import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { followUser, getUserProfileDetails } from './store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import Post from '../../components/Post';

import './index.scss';
import { useTranslation } from 'react-i18next';
import SecondaryButton from 'components/SecondaryButton';
import { userProfileActions } from './store';
import UsersFollow from './components/UsersFollows';

const UserProfile = ({ id }: { id?: string }) => {
  const { _id, isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  let { userId } = useParams();
  userId = userId || id;

  const { t } = useTranslation();
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { userProfileDetails: user, isLoading } = useSelector(
    (state: RootState) => state.home.userProfile
  );

  useEffect(() => {
    if (userId !== user?._id) {
      dispatch(getUserProfileDetails(userId!));
    }
  }, [dispatch, userId, user?._id]);

  if (_id && userId === _id && !id) {
    return <Navigate to="/me" replace />;
  }

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  const handleToggleFollow = async () => {
    await dispatch(followUser(user?._id!));
  };

  const handleShowFollows = (type: string) => () => {
    dispatch(
      userProfileActions.setFollowStatsShown({
        shown: true,
        type,
      })
    );
  };
  return (
    <section className="user-profile">
      {userId && <UsersFollow userId={userId} />}
      <div className="user-profile__details">
        <h2 className="user-profile__details--name" dir="auto">
          {user?.name}
        </h2>
        <h3 className="user-profile__details--bio" dir="auto">
          {user?.bio}
        </h3>
        <div className="user-profile__details--photo">
          <img crossOrigin="anonymous" src={user?.photo} alt={user?.name} />
        </div>
        <p className="user-profile__details--statics">
          <button
            onClick={handleShowFollows('followers')}
            type="button"
            className="user-profile__details--followers btn-follow-stats"
          >
            {t('label.followersNum', {
              num: user?.followersNum,
            })}
          </button>
          <button
            onClick={handleShowFollows('followings')}
            type="button"
            className="user-profile__details--following btn-follow-stats"
          >
            {t('label.followingNum', {
              num: user?.followingNum,
            })}
          </button>
        </p>

        {isAuthenticated && (
          <div className="user-profile__details--actions">
            {user?._id !== _id && (
              <button
                onClick={handleToggleFollow}
                type="button"
                className="user-profile__details--actions__follow"
              >
                {user?.isFollowing ? t('action.unfollow') : t('action.follow')}
              </button>
            )}

            {user?._id === _id && (
              <SecondaryButton
                className="user-profile__details--actions__update-profile"
                link="/settings"
                toPage={t('label.updateMyProfile')}
              />
            )}
          </div>
        )}
      </div>
      <div className="user-profile__posts">
        {(!user?.posts || !user?.posts.length) && (
          <p className="user-profile__posts--title">
            {t('msg.userNoPosts', {
              name: user?.name,
            })}
          </p>
        )}
        {user?.posts && !!user.posts.length && (
          <>
            <h4 className="user-profile__posts--title">
              {t('label.userPosts', {
                name: user?.name,
              })}
            </h4>
            <div className="user-profile__posts--content">
              {user?.posts.map(post => (
                <Post
                  key={post._id}
                  {...post}
                  author={{ name: user.name, _id: user._id }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
