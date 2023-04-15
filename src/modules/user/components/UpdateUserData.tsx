import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { AppDispatch, RootState } from 'store';
import { updateUserData } from '../store/actions';

import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import isValidEmail from 'utils/validators/isValidEmail';
import { useTranslation } from 'react-i18next';

interface Inputs {
  name: string;
  email: string;
}

const UpdateUserData = () => {
  const { t } = useTranslation();
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
      <h2 className="heading-primary settings__heading">
        {' '}
        {t('msg.updateData')}
      </h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput
            id="name"
            type="text"
            label={t('label.name')}
            value={user.name}
          />
          <FormInput
            id="email"
            type="email"
            value={user.email}
            label={t('label.email')}
            isInvalidMessage={errors.email?.message}
            className={emailInputClasses}
            validations={{
              required: t('validateMsg.emailRequired'),
              validate: val =>
                !isValidEmail(val) ? t('validateMsg.emailInvalid') : true,
            }}
          />
          <PrimaryButton text={t('action.save')} type="submit" />
        </form>
      </FormProvider>
    </section>
  );
};

export default UpdateUserData;
