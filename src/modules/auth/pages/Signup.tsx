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

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
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
      <AuthPagesText
        title="Welcome"
        text="Welcome to react training App! signup and try its nice features"
      />
      <FormProvider {...methods}>
        <form
          className="auth-content__form"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <FormInput id="name" type="text" label="Name" />

          <FormInput
            id="email"
            type="email"
            label="E-Mail"
            isInvalidMessage={errors.email?.message}
            className={emailInputClasses}
            validations={{
              required: 'E-Mail is required',
              validate: val =>
                !isValidEmail(val) ? 'Please provide a valid email ' : true,
            }}
          />
          <FormInput
            id="password"
            type="password"
            label="New Password"
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

          <FormInput
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            validations={{
              required: 'Confirm Password is required',
              validate: val =>
                val !== methods.getValues('password')
                  ? 'Passwords does not match'
                  : true,
            }}
            isInvalidMessage={errors.confirmPassword?.message}
            className={confirmPasswordInputClasses}
          />
          <ReCAPTCHA
            className="recaptcha"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
          />
          <PrimaryButton text="Signup" type="submit" />
        </form>
      </FormProvider>
      <SecondaryButton
        text="Already have an account?"
        link="/auth"
        toPage="Login"
      />
    </div>
  );
};

export default Signup;
