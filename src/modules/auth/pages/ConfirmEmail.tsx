import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import FormInput from 'components/FormInput';
import AuthPagesText from '../components/AuthPagesText';

import './ConfirmEmail.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from 'components/LoadingSpinner';
import { confirmEmail, resendConfirmEmailToken } from '../store/actions';

const ConfirmEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { email } = useSelector((state: RootState) => state.user.user);

  const tokenInputRef = useRef<HTMLInputElement>(null);

  const [isToken, setIsToken] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isInvalidMessage, setIsInvalidMessage] = useState('');

  const formSubmitHandler: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();
    const token = tokenInputRef.current?.value;
    if (!token || token.length < 32) {
      if (isTouched) setIsToken(false);
      setIsTouched(true);
      setIsInvalidMessage('Please Enter a Valid Token');

      return;
    }

    setIsInvalidMessage('');
    setIsTouched(true);
    setIsToken(true);

    const success = await dispatch(confirmEmail({ token }));
    if (success) {
      navigate('/home');
    }
  };

  const resendTokenHandler = async () => {
    await dispatch(resendConfirmEmailToken({ email }));
  };

  const tokenInputClasses = `form-control__input ${
    !isToken && isTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="confirm-email">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title="Please confirm your email"
        text="Enter the Token sent to your email"
      />
      <form
        className="auth-content__form"
        onSubmit={formSubmitHandler}
        noValidate
      >
        <FormInput
          id="token"
          type="text"
          label="Your Confirm Token"
          isInvalidMessage={isInvalidMessage}
          ref={tokenInputRef}
          className={tokenInputClasses}
        />

        <PrimaryButton text="SEND" type="submit" />
        <div className="form-control">
          <button
            className="link auth-content__link"
            onClick={resendTokenHandler}
            type="button"
          >
            Didn't receive a token?
          </button>
        </div>
      </form>
      <SecondaryButton text="Or" link="/auth" toPage="Login" />
    </div>
  );
};

export default ConfirmEmail;
