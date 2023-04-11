import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';

import SecondaryButton from 'components/SecondaryButton';
import PrimaryButton from 'components/PrimaryButton';
import FormInput from 'components/FormInput';
import LoadingSpinner from 'components/LoadingSpinner';
import AuthPagesText from '../components/AuthPagesText';

import isValidEmail from 'utils/validators/isValidEmail';
import isValidPassword from 'utils/validators/isValidPassword';

import { AppDispatch, RootState } from 'store';
import { signup } from '../store/actions';

import './Signup.scss';
import { useTranslation } from 'react-i18next';

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { i18n, t } = useTranslation();
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

    const success = await dispatch(signup({ ...data, recaptchaToken }));
    if (success) {
      navigate('/auth/upload-photo');
    }
  };

  const emailInputClasses = `form-control__input ${
    errors.email?.message ? 'form-control__input--invalid' : ''
  }`;

  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid' : ''
  }`;

  const confirmPasswordInputClasses = `form-control__input ${
    errors.confirmPassword?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="signup">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText title={t('msg.welcome')} text={t('msg.signupMsg')} />
      <FormProvider {...methods}>
        <form
          className="auth-content__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput id="name" type="text" label={t('label.name')} />

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
          <ReCAPTCHA
            className="recaptcha"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            hl={i18n.language}
          />
          <PrimaryButton text={t('action.signup')} type="submit" />
        </form>
      </FormProvider>
      <SecondaryButton
        text={t('label.haveAccount')}
        link="/auth"
        toPage={t('action.login')}
      />
    </div>
  );
};

export default Signup;
