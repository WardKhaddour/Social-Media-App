import { FormEvent, FormEventHandler, useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    console.log(email, password);
  };

  return (
    <div className="login">
      <div className="auth-content__text">
        <h2 className=" heading-primary">Welcome</h2>
        <p className="heading-tertiary">
          Welcome again to react training App! <br />
          login and try its nice features
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
          <button className="btn btn-primary auth-content__action--primary">
            Login
          </button>
        </div>
        <div className="form-control">
          <Link className="link auth-content__link" to="/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </form>
      <div className="auth-content__action--secondary ">
        <p className="paragraph auth-content__action--secondary__text">
          doesn't have an account?
        </p>
        <Link to="signup" className="btn btn-secondary">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
