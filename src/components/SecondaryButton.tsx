import { Link } from 'react-router-dom';
import './Button.scss';

const SecondaryButton = (props: {
  text: string;
  link: string;
  toPage: string;
}) => {
  return (
    <div className="auth-content__action--secondary ">
      <p className="paragraph auth-content__action--secondary__text">
        {props.text}
      </p>
      <Link to={props.link} className="btn btn-secondary">
        {props.toPage}
      </Link>
    </div>
  );
};

export default SecondaryButton;
