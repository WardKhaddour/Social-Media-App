import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { ReactComponent as PasswordHidden } from 'assets/icons/passwordHidden.svg';
import { ReactComponent as PasswordShown } from 'assets/icons/passwordShown.svg';

import './FormInput.scss';

interface FormInputProps {
  isInvalidMessage?: string;
  className?: string;
  label: string;
  id: string;
  type?: string;
  value?: string;
  validations?: RegisterOptions;
}

const FormInput = (props: FormInputProps) => {
  const { register } = useFormContext();
  const isPassword = props.type === 'password';

  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const togglePasswordIsShown = () => {
    setPasswordIsShown(prevState => !prevState);
  };

  let inputType = 'text';
  let passwordIcon = (
    <PasswordShown className="form-control__input--toggle-show-password__icon" />
  );
  if (isPassword && !passwordIsShown) {
    inputType = 'password';
    passwordIcon = (
      <PasswordHidden className="form-control__input--toggle-show-password__icon" />
    );
  }

  return (
    <div className="form-control">
      {props.isInvalidMessage && (
        <p className="invalid__message">{props.isInvalidMessage}</p>
      )}
      <div className="form-control__input--wrapper">
        <input
          className={props.className || 'form-control__input'}
          type={inputType}
          id={props.id}
          defaultValue={props.value}
          {...register(props.id, props.validations)}
        />
        {isPassword && (
          <button
            type="button"
            className="form-control__input--toggle-show-password"
            onClick={togglePasswordIsShown}
          >
            {passwordIcon}
          </button>
        )}
      </div>
      <label className="form-control__label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default FormInput;
