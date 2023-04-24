import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { followUser, getUserDetails } from '../store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import Post from '../components/Post';

import './UserProfile.scss';
import { useTranslation } from 'react-i18next';
import SecondaryButton from 'components/SecondaryButton';

const UserProfile = ({ id }: { id?: string }) => {
  const { _id, isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  let { userId } = useParams();
  userId = userId || id;

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { userProfileDetails: user } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    if (userId !== user?._id) {
      setIsLoading(true);
      dispatch(getUserDetails(userId!)).then(() => setIsLoading(false));
    }
  }, [dispatch, userId, user?._id]);

  if (userId === _id && !id) {
    return <Navigate to="/me" />;
  }

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  const handleToggleFollow = async () => {
    await dispatch(followUser(user?._id!));
  };

  return (
    <section className="user-profile">
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
          <span className="user-profile__details--followers">
            {t('label.followers', {
              num: user?.followersNum,
            })}
          </span>
          <span className="user-profile__details--following">
            {t('label.following', {
              num: user?.followingNum,
            })}
          </span>
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
                <Post key={post._id} {...post} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
