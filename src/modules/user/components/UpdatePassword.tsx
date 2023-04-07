import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import isValidPassword from 'utils/validators/isValidPassword';
import { updateUserPassword } from 'store/user/actions';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

interface Inputs {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch<AppDispatch>();
  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    const success = await dispatch(updateUserPassword(data));

    if (success) {
      methods.setValue('currentPassword', '');
      methods.setValue('password', '');
      methods.setValue('confirmPassword', '');
    }
  };

  const currentPasswordInputClasses = `form-control__input ${
    errors.currentPassword?.message ? 'form-control__input--invalid' : ''
  }`;
  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid' : ''
  }`;
  const confirmPasswordInputClasses = `form-control__input ${
    errors.confirmPassword?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__update-password">
      <h2 className="heading-primary settings__heading">
        Update Your Password
      </h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput
            type="password"
            label="Current Password"
            id="currentPassword"
            isInvalidMessage={errors.currentPassword?.message}
            className={currentPasswordInputClasses}
            validations={{
              required: 'Current password is required',
              validate: val =>
                !isValidPassword(val)
                  ? 'Password should be at least 6 characters long'
                  : true,
            }}
          />
          <FormInput
            type="password"
            label="New Password"
            id="password"
            isInvalidMessage={errors.password?.message}
            className={passwordInputClasses}
            validations={{
              required: 'New password is required',
              validate: val =>
                !isValidPassword(val)
                  ? 'Password should be at least 6 characters long'
                  : true,
            }}
          />
          <FormInput
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            isInvalidMessage={errors.confirmPassword?.message}
            className={confirmPasswordInputClasses}
            validations={{
              required: 'Confirm Password is required',
              validate: val =>
                val !== methods.getValues('password')
                  ? 'Passwords does not match'
                  : true,
            }}
          />
          <PrimaryButton text="Save" type="submit" />
        </form>
      </FormProvider>
    </section>
  );
};

export default UpdatePassword;
