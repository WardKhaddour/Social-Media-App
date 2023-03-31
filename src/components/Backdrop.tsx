import { ReactElement } from 'react';

import './Backdrop.scss';

const Backdrop = (props: { children: ReactElement; className: string }) => {
  return <div className={`backdrop ${props.className}`}>{props.children}</div>;
};

export default Backdrop;
