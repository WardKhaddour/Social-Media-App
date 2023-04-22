import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { followUser, getUserDetails } from '../store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import Post from '../components/Post';

import './UserProfile.scss';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { userId } = useParams();

  const { userProfileDetails: user } = useSelector(
    (state: RootState) => state.home
  );

  const { _id, isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );
  useEffect(() => {
    if (userId !== user?._id) {
      setIsLoading(true);
      dispatch(getUserDetails(userId!)).then(() => setIsLoading(false));
    }
  }, [dispatch, userId, user?._id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  const handleToggleFollow = async () => {
    await dispatch(followUser(user?._id!));
  };

  return (
    <section className="user-profile">
      <div className="user-profile__details">
        <h2 className="user-profile__details--name">{user?.name}</h2>
        <h3 className="user-profile__details--bio">{user?.bio}</h3>
        <div className="user-profile__details--photo">
          <img crossOrigin="anonymous" src={user?.photo} alt={user?.name} />
        </div>
        <p className="user-profile__details--statics">
          <span className="user-profile__details--followers">
            Followers :{user?.followersNum}
          </span>
          <span className="user-profile__details--following">
            Following :{user?.followingNum}
          </span>
        </p>
        {isAuthenticated && user?._id !== _id && (
          <div className="user-profile__details--actions">
            <button
              onClick={handleToggleFollow}
              type="button"
              className="user-profile__details--actions--follow"
            >
              {user?.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        )}
      </div>
      <div className="user-profile__posts">
        <h4 className="user-profile__posts--title">{user?.name} Posts</h4>
        <div className="user-profile__posts--content">
          {user?.posts.map(post => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
