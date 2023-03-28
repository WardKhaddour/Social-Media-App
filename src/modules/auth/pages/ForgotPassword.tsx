import { FormEvent, FormEventHandler, useRef } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler: FormEventHandler = (event: FormEvent) => {
    console.log(event);
  };

  return (
    <div className="forgot-password">
      <div className="auth-content__text">
        <h2 className=" heading-primary">Forgot your password?</h2>
        <p className="heading-tertiary">
          Enter your email to send recovery link to you
        </p>
      </div>
      <form className="auth-content__form" onSubmit={formSubmitHandler}>
        <div className="form-control">
          <input
            ref={emailInputRef}
            className="form-control__input"
            type="email"
            id="email"
          />
          <label className="form-control__label" htmlFor="email">
            E-Mail
          </label>
        </div>

        <div className="form-control">
          <button className="btn btn-primary auth-content__action--primary">
            SEND
          </button>
        </div>
      </form>
      <div className="auth-content__action--secondary ">
        <p className="paragraph auth-content__action--secondary__text">Or</p>
        <Link to="/" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
