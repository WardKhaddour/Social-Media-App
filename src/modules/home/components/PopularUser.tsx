import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './PopularUser.scss';
import { MouseEventHandler } from 'react';

interface PopularUserInterface {
  _id: string;
  name: string;
  photo: string;
  bio: string;
  isFollowing?: boolean;
  withFollowing?: boolean;
  onToggleFollow?: MouseEventHandler<HTMLButtonElement>;
}

const PopularUser = (props: PopularUserInterface) => {
  const { t } = useTranslation();

  return (
    <li className="popular-user">
      <div className="popular-user__info">
        <span className="popular-user__photo">
          <img crossOrigin="anonymous" src={props.photo} alt={props.name} />
        </span>
        <span className="popular-user__name" dir="auto">
          {props.name}
        </span>
        <span className="popular-user__bio" dir="auto">
          {props.bio}
        </span>
      </div>
      <div className="popular-user__actions">
        <Link to={`/user/${props._id}`} className="popular-user__view">
          {t('action.view')}
        </Link>
        {props.withFollowing && (
          <button
            onClick={props.onToggleFollow}
            type="button"
            className="popular-user__follow"
          >
            {props.isFollowing ? t('action.unfollow') : t('action.follow')}
          </button>
        )}
      </div>
    </li>
  );
};

export default PopularUser;
