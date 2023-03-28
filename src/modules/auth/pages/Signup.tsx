import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import AuthPagesText from '../components/AuthPagesText';
import FormInput from '../components/FormInput';
import isValidEmail from '../../../utils/validators/isValidEmail';
import isValidPassword from '../../../utils/validators/isValidPassword';

const Signup = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [isEmail, setIsEmail] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [emailIsInvalidMessage, setEmailIsInvalidMessage] = useState('');

  const [isPassword, setIsPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsInvalidMessage, setPasswordIsInvalidMessage] = useState('');

  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [confirmPasswordIsInvalidMessage, setConfirmPasswordIsInvalidMessage] =
    useState('');

  const formSubmitHandler: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;
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

    if (confirmPassword !== password) {
      if (confirmPasswordIsTouched) setIsConfirmPassword(false);
      setConfirmPasswordIsTouched(true);
      setConfirmPasswordIsInvalidMessage('Passwords not matched');

      return;
    }
    setEmailIsInvalidMessage('');
    setPasswordIsInvalidMessage('');
    setConfirmPasswordIsInvalidMessage('');
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    setConfirmPasswordIsTouched(true);
    setIsEmail(true);
    setIsPassword(true);
    setIsConfirmPassword(true);

    console.log(name, email, password, confirmPassword);
  };

  const emailInputClasses = `form-control__input ${
    !isEmail && emailIsTouched ? 'form-control__input--invalid' : ''
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
    <div className="signup">
      <AuthPagesText
        title="Welcome"
        text="Welcome to react training App! signup and try its nice features"
      />

      <form className="auth-content__form" onSubmit={formSubmitHandler}>
        <FormInput id="name" type="text" label="Name" ref={nameInputRef} />

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

        <FormInput
          id="confirm-password"
          type="password"
          label="Confirm Password"
          isInvalidMessage={confirmPasswordIsInvalidMessage}
          ref={confirmPasswordInputRef}
          className={confirmPasswordInputClasses}
        />

        <PrimaryButton text="Signup" type="submit" />
      </form>
      <SecondaryButton
        text="Already have an account?"
        link="/"
        toPage="Login"
      />
    </div>
  );
};

export default Signup;
