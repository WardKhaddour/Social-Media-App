import PrimaryButton from 'components/PrimaryButton';
import FormInput from 'components/FormInput';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useSelector } from 'react-redux';
import {
  confirmEmail,
  resendConfirmEmailToken,
} from '../../auth/store/actions';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  token: string;
}

const ConfirmEmail = () => {
  const { t } = useTranslation('translation', { useSuspense: true });
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch<AppDispatch>();
  const { email } = useSelector((state: RootState) => state.user.user);

  const formSubmitHandler: SubmitHandler<Inputs> = async data => {
    await dispatch(confirmEmail(data));
  };

  const resendTokenHandler = async () => {
    await dispatch(resendConfirmEmailToken({ email }));
  };

  const tokenInputClasses = `form-control__input ${
    errors.token?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="settings__confirm-email">
      <h2 className="heading-primary settings__heading">
        {t('msg.confirmEmail')}
      </h2>
      <FormProvider {...methods}>
        <form
          className="settings__form"
          onSubmit={handleSubmit(formSubmitHandler)}
          noValidate
        >
          <FormInput
            id="token"
            type="text"
            label={t('label.confirmToken')}
            isInvalidMessage={errors.token?.message}
            className={tokenInputClasses}
            validations={{
              required: t('validateMsg.tokenRequired'),
            }}
          />

          <PrimaryButton text={t('action.confirm')} type="submit" />
          <div className="form-control">
            <button
              className="link auth-content__link"
              onClick={resendTokenHandler}
              type="button"
            >
              {t('action.resendToken')}
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default ConfirmEmail;
