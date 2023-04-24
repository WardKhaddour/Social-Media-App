import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './PopularUser.scss';

interface PopularUserInterface {
  _id: string;
  name: string;
  photo: string;
  bio: string;
}

const PopularUser = (props: PopularUserInterface) => {
  const { t } = useTranslation();

  return (
    <li className="popular-user">
      <div className="popular-user__info">
        <span className="popular-user__photo">
          <img crossOrigin="anonymous" src={props.photo} alt={props.name} />
        </span>
        <span className="popular-user__name">{props.name}</span>
      </div>
      <div className="popular-user__bio">{props.bio}</div>
      <div className="popular-user__actions">
        <Link to={`user/${props._id}`} className="popular-user__view">
          {t('action.view')}
        </Link>
      </div>
    </li>
  );
};

export default PopularUser;
