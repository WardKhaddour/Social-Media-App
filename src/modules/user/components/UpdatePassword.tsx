import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import isValidPassword from 'utils/validators/isValidPassword';
import { updateUserPassword } from 'store/user/actions';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const { t } = useTranslation();
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
        {t('msg.updatePassword')}
      </h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput
            type="password"
            label={t('label.currentPassword')}
            id="currentPassword"
            isInvalidMessage={errors.currentPassword?.message}
            className={currentPasswordInputClasses}
            validations={{
              required: t('validateMsg.passwordRequired'),
              validate: val =>
                !isValidPassword(val) ? t('validateMsg.shortPassword') : true,
            }}
          />
          <FormInput
            type="password"
            label={t('label.newPassword')}
            id="password"
            isInvalidMessage={errors.password?.message}
            className={passwordInputClasses}
            validations={{
              required: t('validateMsg.passwordRequired'),
              validate: val =>
                !isValidPassword(val) ? t('validateMsg.shortPassword') : true,
            }}
          />
          <FormInput
            id="confirmPassword"
            type="password"
            label={t('label.confirmPassword')}
            className={confirmPasswordInputClasses}
            validations={{
              required: t('validateMsg.confirmPasswordRequired'),
              validate: val =>
                val !== methods.getValues('password')
                  ? t('validateMsg.noMatchedPasswords')
                  : true,
            }}
            isInvalidMessage={errors.confirmPassword?.message}
          />
          <PrimaryButton text={t('action.save')} type="submit" />
        </form>
      </FormProvider>
    </section>
  );
};

export default UpdatePassword;
