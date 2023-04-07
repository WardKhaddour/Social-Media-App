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

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
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
    errors.email?.message ? 'form-control__input--invalid':''
  }`;

  const passwordInputClasses = `form-control__input ${
    errors.password?.message ? 'form-control__input--invalid':''
  }`;

  return (
    <div className="login">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title="Welcome"
        text="Welcome again to react training App! 
          login and try its nice features"
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
            label="E-Mail"
            isInvalidMessage={errors.email?.message}
            className={emailInputClasses}
            validations={{
              required: 'E-Mail is required',
              validate: val =>
                !isValidEmail(val) ? 'Please provide a valid email' : true,
            }}
          />
          <FormInput
            id="password"
            type="password"
            label="Password"
            isInvalidMessage={errors.password?.message}
            className={passwordInputClasses}
            validations={{
              required: 'Password is required',
              validate: val =>
                !isValidPassword(val)
                  ? 'Password should be at least 6 characters long'
                  : true,
            }}
          />
          <ReCAPTCHA
            className="recaptcha"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
          />
          <PrimaryButton text="Login" type="submit" />
          <div className="form-control">
            <Link
              className="link auth-content__link"
              to="/auth/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </FormProvider>

      <SecondaryButton
        text="doesn't have an account?"
        link="/auth/signup"
        toPage="Signup"
      />
    </div>
  );
};

export default Login;
