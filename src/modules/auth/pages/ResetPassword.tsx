import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';

import isValidPassword from 'utils/validators/isValidPassword';

import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import FormInput from 'components/FormInput';
import LoadingSpinner from 'components/LoadingSpinner';
import AuthPagesText from '../components/AuthPagesText';

import { AppDispatch, RootState } from 'store';

import { resetPassword } from '../store/actions';

import './ResetPassword.scss';
import { useTranslation } from 'react-i18next';
interface Inputs {
  token: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    const success = await dispatch(resetPassword(data));
    if (success) {
      navigate('/');
    }
  };

  const tokenInputClasses = `form-control__input ${
    errors.token?.message ? 'form-control__input--invalid' : ''
  }`;

  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid' : ''
  }`;

  const confirmPasswordInputClasses = `form-control__input ${
    errors.confirmPassword?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="reset-password">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title={t('action.resetPassword')}
        text={t('msg.resetPassword')}
      />
      <FormProvider {...methods}>
        <form
          className="auth-content__form"
          onSubmit={handleSubmit(formSubmitHandler)}
          noValidate
        >
          <FormInput
            id="token"
            type="text"
            label={t('label.token')}
            validations={{
              required: t('validateMsg.tokenRequired'),
            }}
            isInvalidMessage={errors.token?.message}
            className={tokenInputClasses}
          />
          <FormInput
            id="password"
            type="password"
            label={t('label.newPassword')}
            className={passwordInputClasses}
            validations={{
              required: t('validateMsg.passwordRequired'),
              validate: val =>
                !isValidPassword(val) ? t('validateMsg.shortPassword') : true,
            }}
            isInvalidMessage={errors.password?.message}
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
          <PrimaryButton text={t('action.send')} type="submit" />

          <div className="form-control">
            <Link
              className="link auth-content__link"
              to="/auth/forgot-password"
            >
              {t('action.noReceivedToken')}
            </Link>
          </div>
        </form>
      </FormProvider>
      <SecondaryButton
        text={t('msg.or')}
        link="/auth"
        toPage={t('action.login')}
      />
    </div>
  );
};

export default ResetPassword;
