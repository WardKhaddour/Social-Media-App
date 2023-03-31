import { Link } from 'react-router-dom';

const AppLink = (props: {
  link: string;
  toPage: string;
  isPrimary: boolean;
  className: string;
}) => {
  return (
    <Link
      to={props.link}
      className={`btn btn-${props.isPrimary ? 'primary' : 'secondary'}  ${
        props.className
      }`}
    >
      {props.toPage}
    </Link>
  );
};

export default AppLink;
