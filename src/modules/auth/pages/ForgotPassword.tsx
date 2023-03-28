import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import isValidEmail from '../../../utils/validators/isValidEmail';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FormInput from '../components/FormInput';
import AuthPagesText from '../components/AuthPagesText';

const ForgotPassword = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [isEmail, setIsEmail] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isInvalidMessage, setIsInvalidMessage] = useState('');

  const formSubmitHandler: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    if (!email || !isValidEmail(email)) {
      if (isTouched) setIsEmail(false);
      setIsTouched(true);
      setIsInvalidMessage('Please Enter a Valid E-Mail');

      return;
    }

    setIsInvalidMessage('');
    setIsTouched(true);
    setIsEmail(true);
  };

  const emailInputClasses = `form-control__input ${
    !isEmail && isTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="forgot-password">
      <AuthPagesText
        title="Forgot your password?"
        text="Enter your email to send recovery link to you"
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
          isInvalidMessage={isInvalidMessage}
          ref={emailInputRef}
          className={emailInputClasses}
        />

        <PrimaryButton text="SEND" type="submit" />
      </form>
      <SecondaryButton text="Or" link="/" toPage="Login" />
    </div>
  );
};

export default ForgotPassword;
