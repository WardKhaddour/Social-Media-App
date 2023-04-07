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
interface Inputs {
  token: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
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
        title="Reset Your Password"
        text="Enter the token received on your email"
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
            label="Your token"
            validations={{
              validate: val => (val.length < 32 ? 'Token is too short' : true),
            }}
            className={tokenInputClasses}
          />
          <FormInput
            id="password"
            type="password"
            label="New Password"
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
            className={confirmPasswordInputClasses}
            validations={{
              required: 'Confirm Password is required',
              validate: val =>
                val !== methods.getValues('password')
                  ? 'Passwords does not match'
                  : true,
            }}
          />
          <PrimaryButton text="SEND" type="submit" />

          <div className="form-control">
            <Link
              className="link auth-content__link"
              to="/auth/forgot-password"
            >
              Didn't receive a token?
            </Link>
          </div>
        </form>
      </FormProvider>
      <SecondaryButton text="Or" link="/auth" toPage="Login" />
    </div>
  );
};

export default ResetPassword;
