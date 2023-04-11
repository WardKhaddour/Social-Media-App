import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import isValidEmail from 'utils/validators/isValidEmail';
import { AppDispatch, RootState } from 'store';
import LoadingSpinner from 'components/LoadingSpinner';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import FormInput from 'components/FormInput';
import AuthPagesText from '../components/AuthPagesText';
import { forgotPassword } from '../store/actions';

import './ForgotPassword.scss';
import { useTranslation } from 'react-i18next';

interface Inputs {
  email: string;
}

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
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

    const success = await dispatch(forgotPassword({ ...data, recaptchaToken }));
    if (success) {
      navigate('/auth/reset-password');
    }
  };

  const emailInputClasses = `form-control__input ${
    errors.email?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="forgot-password">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title={t('action.forgotPassword')}
        text={t('msg.enterEmailFP')}
      />
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
            validations={{
              required: t('validateMsg.emailRequired'),
              validate: val =>
                !isValidEmail(val) ? t('validateMsg.emailInvalid') : true,
            }}
            isInvalidMessage={errors.email?.message}
            className={emailInputClasses}
          />
          <ReCAPTCHA
            className="recaptcha"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            hl={i18n.language}
          />
          <PrimaryButton text={t('action.send')} type="submit" />
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

export default ForgotPassword;
