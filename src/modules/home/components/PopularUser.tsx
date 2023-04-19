import './PopularUser.scss';

interface PopularUserInterface {
  _id: string;
  name: string;
  photo: string;
  bio: string;
}

const PopularUser = (props: PopularUserInterface) => {
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
        <button type="button" className="popular-user__follow">
          Follow
        </button>
        <button type="button" className="popular-user__view">
          View
        </button>
      </div>
    </li>
  );
};

export default PopularUser;
