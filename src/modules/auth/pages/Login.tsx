import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import LoadingSpinner from 'components/LoadingSpinner';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import FormInput from 'components/FormInput';
import AuthPagesText from '../components/AuthPagesText';

import isValidEmail from 'utils/validators/isValidEmail';
import isValidPassword from 'utils/validators/isValidPassword';

import { login } from '../store/actions';
import { AppDispatch, RootState } from 'store';

import './Login.scss';
import { useTranslation } from 'react-i18next';

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { t, i18n } = useTranslation('translation', { useSuspense: true });
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.user);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    const recaptchaToken = recaptchaRef.current?.getValue() || '';
    recaptchaRef.current?.reset();

    const success = await dispatch(login({ ...data, recaptchaToken }));
    if (success) {
      navigate('/home');
    }
  };

  const emailInputClasses = `form-control__input ${
    errors.email?.message ? 'form-control__input--invalid' : ''
  }`;

  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="login">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText title={t('msg.welcome')} text={t('msg.loginMsg')} />
      <FormProvider {...methods}>
        <form
          className="auth-content__form"
          onSubmit={handleSubmit(formSubmitHandler)}
          noValidate
        >
          <FormInput
            id="email"
            type="email"
            label={t('label.email')}
            isInvalidMessage={errors.email?.message}
            className={emailInputClasses}
            validations={{
              required: t('validateMsg.emailRequired'),
              validate: val =>
                !isValidEmail(val) ? t('validateMsg.emailInvalid') : true,
            }}
          />
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
          <ReCAPTCHA
            className="recaptcha"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            hl={i18n.language}
          />
          <PrimaryButton text={t('action.login')} type="submit" />
          <div className="form-control">
            <Link
              className="link auth-content__link"
              to="/auth/forgot-password"
            >
              {t('action.forgotPassword')}
            </Link>
          </div>
        </form>
      </FormProvider>

      <SecondaryButton
        text={t('label.noAccount')}
        link="/auth/signup"
        toPage={t('action.signup')}
      />
    </div>
  );
};

export default Login;
