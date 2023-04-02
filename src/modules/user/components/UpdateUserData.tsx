import { RootState } from 'store';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';

const UpdateUserData = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="settings__update">
      <h2 className="heading-primary settings__heading"> Update Your Data</h2>
      <form className="settings__form">
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
        />
        <PrimaryButton text="Save" type="submit" />
      </form>
    </section>
  );
};

export default UpdateUserData;
