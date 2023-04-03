import { FormEvent, useState, useRef } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import FormInput from 'components/FormInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import isValidPassword from 'utils/validators/isValidPassword';
import { deleteUser } from 'store/user/actions';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isPassword, setIsPassword] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsInvalidMessage, setPasswordIsInvalidMessage] = useState('');

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef.current?.value;
    if (!password || !isValidPassword(password)) {
      if (passwordIsTouched) setIsPassword(false);
      setPasswordIsTouched(true);
      setPasswordIsInvalidMessage('Password should be at least 6 characters ');

      return;
    }

    setPasswordIsInvalidMessage('');
    setPasswordIsTouched(true);
    setIsPassword(true);

    const success = await dispatch(deleteUser({ password }));
    if (success) {
      navigate('/');
    }
  };

  const passwordInputClasses = `form-control__input ${
    !isPassword && passwordIsTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__delete-account">
      <h2 className="heading-primary settings__heading">Delete My Account</h2>

      <form className="settings__form" onSubmit={formSubmitHandler}>
        <FormInput
          ref={passwordInputRef}
          type="password"
          label="Your Password"
          id="password"
          isInvalidMessage={passwordIsInvalidMessage}
          className={passwordInputClasses}
        />
        <PrimaryButton text="Delete" type="submit" />
      </form>
    </section>
  );
};

export default DeleteUser;
