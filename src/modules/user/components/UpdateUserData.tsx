import { AppDispatch, RootState } from 'store';
import { FormEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import isValidEmail from 'utils/validators/isValidEmail';
import { updateUserData } from 'store/user/actions';
import { useDispatch } from 'react-redux';

const UpdateUserData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [isEmail, setIsEmail] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [emailIsInvalidMessage, setEmailIsInvalidMessage] = useState('');

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;

    if (!email || !isValidEmail(email)) {
      if (emailIsTouched) setIsEmail(false);
      setEmailIsTouched(true);
      setEmailIsInvalidMessage('Please provide a valid E-Mail');

      return;
    }

    setEmailIsInvalidMessage('');
    setEmailIsTouched(true);
    setIsEmail(true);

    const success = await dispatch(
      updateUserData({
        name,
        email,
      })
    );

    if (success) {
      emailInputRef.current.value = '';
    }
  };

  const emailInputClasses = `form-control__input ${
    !isEmail && emailIsTouched ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__update-data">
      <h2 className="heading-primary settings__heading"> Update Your Data</h2>
      <form className="settings__form" onSubmit={formSubmitHandler}>
        <FormInput
          label="Name"
          id="name"
          ref={nameInputRef}
          value={user.name}
        />

        <FormInput
          label="E-Mail"
          id="email"
          type="email"
          ref={emailInputRef}
          value={user.email}
          className={emailInputClasses}
          isInvalidMessage={emailIsInvalidMessage}
        />
        <PrimaryButton text="Save" type="submit" />
      </form>
    </section>
  );
};

export default UpdateUserData;
