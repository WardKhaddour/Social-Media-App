import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import FormInput from 'components/FormInput';

// import './ConfirmEmail.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useSelector } from 'react-redux';
import {
  confirmEmail,
  resendConfirmEmailToken,
} from '../../auth/store/actions';

const ConfirmEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
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

    await dispatch(confirmEmail({ token }));
  };

  const resendTokenHandler = async () => {
    await dispatch(resendConfirmEmailToken({ email }));
  };

  const tokenInputClasses = `form-control__input ${
    !isToken && isTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__confirm-email">
      <h2 className="heading-primary settings__heading">Confirm your E-Mail</h2>
      <form className="settings__form" onSubmit={formSubmitHandler} noValidate>
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
            Resend token?
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConfirmEmail;
