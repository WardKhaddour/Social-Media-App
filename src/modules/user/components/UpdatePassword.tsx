import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import { useRef, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import isValidPassword from 'utils/validators/isValidPassword';
import { updateUserPassword } from 'store/user/actions';

const UpdatePassword = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentPasswordInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [currentPasswordIsTouched, setCurrentPasswordIsTouched] =
    useState(false);
  const [currentPasswordIsInvalidMessage, setCurrentPasswordIsInvalidMessage] =
    useState('');

  const [isPassword, setIsPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsInvalidMessage, setPasswordIsInvalidMessage] = useState('');

  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [confirmPasswordIsInvalidMessage, setConfirmPasswordIsInvalidMessage] =
    useState('');

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const currentPassword = currentPasswordInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;

    if (!currentPassword || !isValidPassword(currentPassword)) {
      if (currentPasswordIsTouched) setIsCurrentPassword(false);
      setCurrentPasswordIsTouched(true);
      setCurrentPasswordIsInvalidMessage(
        'Password should be at least 6 characters '
      );

      return;
    }

    if (!password || !isValidPassword(password)) {
      if (passwordIsTouched) setIsPassword(false);
      setPasswordIsTouched(true);
      setPasswordIsInvalidMessage('Password should be at least 6 characters ');

      return;
    }
    if (!confirmPassword || !isValidPassword(confirmPassword)) {
      if (confirmPasswordIsTouched) setIsConfirmPassword(false);
      setConfirmPasswordIsTouched(true);
      setConfirmPasswordIsInvalidMessage('Passwords dose not match');

      return;
    }
    setCurrentPasswordIsInvalidMessage('');
    setPasswordIsInvalidMessage('');
    setConfirmPasswordIsInvalidMessage('');
    setCurrentPasswordIsTouched(true);
    setPasswordIsTouched(true);
    setConfirmPasswordIsTouched(true);
    setIsCurrentPassword(true);
    setIsPassword(true);
    setIsConfirmPassword(true);

    const success = await dispatch(
      updateUserPassword({
        currentPassword,
        password,
        confirmPassword,
      })
    );

    if (success) {
      currentPasswordInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';
    }
  };

  const currentPasswordInputClasses = `form-control__input ${
    !isCurrentPassword && currentPasswordIsTouched
      ? 'form-control__input--invalid'
      : ''
  }`;
  const passwordInputClasses = `form-control__input ${
    !isPassword && passwordIsTouched ? 'form-control__input--invalid' : ''
  }`;
  const confirmPasswordInputClasses = `form-control__input ${
    !isConfirmPassword && confirmPasswordIsTouched
      ? 'form-control__input--invalid'
      : ''
  }`;

  return (
    <section className="settings__update-password">
      <h2 className="heading-primary settings__heading">
        Update Your Password
      </h2>
      <form className="settings__form" onSubmit={formSubmitHandler}>
        <FormInput
          ref={currentPasswordInputRef}
          type="password"
          label="Current Password"
          id="current-password"
          isInvalidMessage={currentPasswordIsInvalidMessage}
          className={currentPasswordInputClasses}
        />
        <FormInput
          ref={passwordInputRef}
          type="password"
          label="New Password"
          id="new-password"
          isInvalidMessage={passwordIsInvalidMessage}
          className={passwordInputClasses}
        />
        <FormInput
          ref={confirmPasswordInputRef}
          type="password"
          label="Confirm Password"
          id="confirm-password"
          isInvalidMessage={confirmPasswordIsInvalidMessage}
          className={confirmPasswordInputClasses}
        />
        <PrimaryButton text="Save" type="submit" />
      </form>
    </section>
  );
};

export default UpdatePassword;
