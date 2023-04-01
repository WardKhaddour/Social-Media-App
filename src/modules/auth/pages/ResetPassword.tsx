import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import FormInput from 'components/FormInput';
import AuthPagesText from '../components/AuthPagesText';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from 'components/LoadingSpinner';
import { resetPassword } from '../store/actions';
import isValidPassword from 'utils/validators/isValidPassword';

import './ResetPassword.scss';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const tokenInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [isValidToken, setIsValidToken] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isInvalidMessage, setIsInvalidMessage] = useState('');

  const [isPassword, setIsPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsInvalidMessage, setPasswordIsInvalidMessage] = useState('');

  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [confirmPasswordIsInvalidMessage, setConfirmPasswordIsInvalidMessage] =
    useState('');

  const formSubmitHandler: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();
    const token = tokenInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;
    if (!token || token.length < 32) {
      if (isTouched) setIsValidToken(false);
      setIsTouched(true);
      setIsInvalidMessage('Please Enter a token');

      return;
    }

    if (!password || !isValidPassword(password)) {
      if (passwordIsTouched) setIsPassword(false);
      setPasswordIsTouched(true);
      setPasswordIsInvalidMessage('Password should be at least 6 characters ');

      return;
    }

    if (confirmPassword !== password) {
      if (confirmPasswordIsTouched) setIsConfirmPassword(false);
      setConfirmPasswordIsTouched(true);
      setConfirmPasswordIsInvalidMessage('Passwords not matched');

      return;
    }

    setIsInvalidMessage('');
    setIsTouched(true);
    setIsValidToken(true);

    const success = await dispatch(
      resetPassword({ token, password, confirmPassword })
    );
    if (success) {
      navigate('/');
    }
  };

  const tokenInputClasses = `form-control__input ${
    !isValidToken && isTouched ? 'form-control__input--invalid' : ''
  }`;

  const passwordInputClasses = `form-control__input ${
    !isPassword && passwordIsTouched ? 'form-control__input--invalid' : ''
  }`;

  const confirmPasswordInputClasses = `form-control__input ${
    !isConfirmPassword && passwordIsTouched
      ? 'form-control__input--invalid'
      : ''
  }`;

  return (
    <div className="reset-password">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title="Reset Your Password"
        text="Enter the token received on your email"
      />
      <form
        className="auth-content__form"
        onSubmit={formSubmitHandler}
        noValidate
      >
        <FormInput
          id="token"
          type="text"
          label="Your token"
          isInvalidMessage={isInvalidMessage}
          ref={tokenInputRef}
          className={tokenInputClasses}
        />
        <FormInput
          id="password"
          type="password"
          label="New Password"
          isInvalidMessage={passwordIsInvalidMessage}
          ref={passwordInputRef}
          className={passwordInputClasses}
        />

        <FormInput
          id="confirm-password"
          type="password"
          label="Confirm Password"
          isInvalidMessage={confirmPasswordIsInvalidMessage}
          ref={confirmPasswordInputRef}
          className={confirmPasswordInputClasses}
        />
        <PrimaryButton text="SEND" type="submit" />

        <div className="form-control">
          <Link className="link auth-content__link" to="/auth/forgot-password">
            Didn't receive a token?
          </Link>
        </div>
      </form>
      <SecondaryButton text="Or" link="/auth" toPage="Login" />
    </div>
  );
};

export default ResetPassword;
