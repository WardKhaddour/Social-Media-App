import { MouseEventHandler, ReactElement } from 'react';

import './Backdrop.scss';

const Backdrop = (props: {
  children: ReactElement;
  className: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <div onClick={props.onClick} className={`backdrop ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Backdrop;
