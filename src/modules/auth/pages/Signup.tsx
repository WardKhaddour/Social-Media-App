import { FormEvent, FormEventHandler, useRef } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const passwordConfirm = passwordConfirmInputRef.current?.value;
    console.log(name, email, password, passwordConfirm);
  };

  return (
    <div className="signup">
      <div className="auth-content__text">
        <h2 className=" heading-primary">Welcome</h2>
        <p className="heading-tertiary">
          Welcome to react training App! <br />
          signup and try its nice features
        </p>
      </div>
      <form className="auth-content__form" onSubmit={formSubmitHandler}>
        <div className="form-control">
          <input
            ref={nameInputRef}
            className="form-control__input"
            type="text"
            id="name"
          />
          <label className="form-control__label" htmlFor="name">
            Name
          </label>
        </div>
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
          <input
            ref={passwordInputRef}
            className="form-control__input"
            type="password"
            id="password"
            minLength={6}
          />
          <label className="form-control__label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="form-control">
          <input
            ref={passwordConfirmInputRef}
            className="form-control__input"
            type="password"
            id="confirm-password"
            minLength={6}
          />
          <label className="form-control__label" htmlFor="confirm-password">
            Confirm Password
          </label>
        </div>
        <div className="form-control">
          <button className="btn btn-primary auth-content__action--primary">
            Signup
          </button>
        </div>
      </form>
      <div className="auth-content__action--secondary">
        <p className="paragraph auth-content__action--secondary__text">
          Already have an account?
        </p>
        <Link to="/" className="btn btn-secondary ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
