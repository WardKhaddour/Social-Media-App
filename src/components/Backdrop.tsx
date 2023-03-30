import { ReactElement } from 'react';

const Backdrop = (props: { children: ReactElement; className: string }) => {
  return <div className={`backdrop ${props.className}`}>{props.children}</div>;
};

export default Backdrop;
