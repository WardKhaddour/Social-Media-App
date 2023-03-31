import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import './LoadingSpinner.scss';

const LoadingSpinner = (props: { loading: boolean }) => {
  const backdropClasses = props.loading ? '' : 'hidden';
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className={backdropClasses}>
          <div className="loading-spinner"></div>
        </Backdrop>,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default LoadingSpinner;
