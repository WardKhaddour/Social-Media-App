import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { AppDispatch, RootState } from 'store';
import { updateUserData } from 'store/user/actions';

import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import isValidEmail from 'utils/validators/isValidEmail';

interface Inputs {
  name: string;
  email: string;
}

const UpdateUserData = () => {
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    await dispatch(
      updateUserData({
        name: data.name,
        email: data.email,
      })
    );
  };

  const emailInputClasses = `form-control__input ${
    errors.email?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__update-data">
      <h2 className="heading-primary settings__heading"> Update Your Data</h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput label="Name" id="name" value={user.name} />
          <FormInput
            label="E-Mail"
            id="email"
            type="email"
            value={user.email}
            className={emailInputClasses}
            isInvalidMessage={errors.email?.message}
            validations={{
              required: 'E-Mail is required',
              validate: val =>
                !isValidEmail(val) ? 'Please provide a valid email ' : true,
            }}
          />
          <PrimaryButton text="Save" type="submit" />
        </form>
      </FormProvider>
    </section>
  );
};

export default UpdateUserData;
