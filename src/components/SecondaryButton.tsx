import { Link } from 'react-router-dom';
import './Button.scss';

const SecondaryButton = (props: {
  text?: string;
  link: string;
  toPage: string;
  className?: string;
}) => {
  const btnClasses = props.className
    ? `btn btn-secondary ${props.className}`
    : 'btn btn-secondary';

  return (
    <div className="auth-content__action--secondary ">
      {props.text && (
        <p className="paragraph auth-content__action--secondary__text">
          {props.text}
        </p>
      )}
      <Link to={props.link} className={btnClasses}>
        {props.toPage}
      </Link>
    </div>
  );
};

export default SecondaryButton;
