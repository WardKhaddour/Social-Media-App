import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FormInput from '../components/FormInput';
import AuthPagesText from '../components/AuthPagesText';
import LoadingSpinner from 'components/LoadingSpinner';

import isValidEmail from 'utils/validators/isValidEmail';
import isValidPassword from 'utils/validators/isValidPassword';
import { login } from '../store/actions';
import { AppDispatch, RootState } from 'store';

import './Login.scss';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.user);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isEmail, setIsEmail] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [emailIsInvalidMessage, setEmailIsInvalidMessage] = useState('');

  const [isPassword, setIsPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsInvalidMessage, setPasswordIsInvalidMessage] = useState('');

  const formSubmitHandler: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!email || !isValidEmail(email)) {
      if (emailIsTouched) setIsEmail(false);
      setEmailIsTouched(true);
      setEmailIsInvalidMessage('Please Enter a Valid E-Mail');

      return;
    }

    if (!password || !isValidPassword(password)) {
      if (passwordIsTouched) setIsPassword(false);
      setPasswordIsTouched(true);
      setPasswordIsInvalidMessage('Password should be at least 6 characters ');

      return;
    }
    setEmailIsInvalidMessage('');
    setPasswordIsInvalidMessage('');
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    setIsEmail(true);
    setIsPassword(true);

    const success = await dispatch(login({ email, password }));
    if (success) {
      navigate('/home');
    }
  };

  const emailInputClasses = `form-control__input ${
    !isEmail && emailIsTouched ? 'form-control__input--invalid' : ''
  }`;

  const passwordInputClasses = `form-control__input ${
    !isPassword && passwordIsTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="login">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title="Welcome"
        text="Welcome again to react training App! 
          login and try its nice features"
      />

      <form
        className="auth-content__form"
        onSubmit={formSubmitHandler}
        noValidate
      >
        <FormInput
          id="email"
          type="email"
          label="E-Mail"
          isInvalidMessage={emailIsInvalidMessage}
          ref={emailInputRef}
          className={emailInputClasses}
        />
        <FormInput
          id="password"
          type="password"
          label="Password"
          isInvalidMessage={passwordIsInvalidMessage}
          ref={passwordInputRef}
          className={passwordInputClasses}
        />
        <PrimaryButton text="Login" type="submit" />
        <div className="form-control">
          <Link className="link auth-content__link" to="/auth/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </form>

      <SecondaryButton
        text="doesn't have an account?"
        link="/auth/signup"
        toPage="Signup"
      />
    </div>
  );
};

export default Login;
