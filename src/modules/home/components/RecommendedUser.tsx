import './RecommendedUser.scss';

interface RecommendedUserInterface {
  id: string;
  name: string;
  photo: string;
  bio: string;
}

const RecommendedUser = (props: RecommendedUserInterface) => {
  return (
    <li className="recommended-user">
      <div className="recommended-user__info">
        <span className="recommended-user__photo">
          <img crossOrigin="anonymous" src={props.photo} alt={props.name} />
        </span>
        <span className="recommended-user__name">{props.name}</span>
      </div>
      <div className="recommended-user__bio">{props.bio}</div>
      <div className="recommended-user__actions">
        <button type="button" className="recommended-user__follow">
          Follow
        </button>
        <button type="button" className="recommended-user__view">
          View
        </button>
      </div>
    </li>
  );
};

export default RecommendedUser;
