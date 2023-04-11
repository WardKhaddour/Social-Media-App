import PrimaryButton from 'components/PrimaryButton';
import FormInput from 'components/FormInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import isValidPassword from 'utils/validators/isValidPassword';
import { deleteUser } from 'store/user/actions';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
interface Inputs {
  password: string;
}

const DeleteUser = () => {
  const { t } = useTranslation('translation', { useSuspense: true });
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    const success = await dispatch(deleteUser(data));
    if (success) {
      navigate('/');
    }
  };
  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid' : ''
  }`;
  return (
    <section className="settings__delete-account">
      <h2 className="heading-primary settings__heading">
        {t('msg.deleteAccount')}
      </h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput
            id="password"
            type="password"
            label={t('label.password')}
            isInvalidMessage={errors.password?.message}
            className={passwordInputClasses}
            validations={{
              required: t('validateMsg.passwordRequired'),
              validate: val =>
                !isValidPassword(val) ? t('validateMsg.shortPassword') : true,
            }}
          />
          <PrimaryButton text={t('action.delete')} type="submit" />
        </form>
      </FormProvider>
    </section>
  );
};

export default DeleteUser;
