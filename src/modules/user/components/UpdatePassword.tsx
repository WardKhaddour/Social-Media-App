import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';

const UpdatePassword = () => {
  return (
    <section className="settings__update">
      <h2 className="heading-primary settings__heading">
        {' '}
        Update Your Password
      </h2>
      <form className="settings__form">
        <FormInput type="password" label="New Password" id="new-password" />
        <FormInput
          type="password"
          label="Confirm Password"
          id="confirm-password"
        />
        <PrimaryButton text="Save" type="submit" />
      </form>
    </section>
  );
};

export default UpdatePassword;
