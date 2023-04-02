import { Ref, forwardRef } from 'react';
import './FormInput.scss';

type FormInputProps = {
  isInvalidMessage?: string;
  className?: string;
  label: string;
  id: string;
  type?: string;
  value?: string;
};

const FormInput = forwardRef(
  (props: FormInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="form-control">
        {props.isInvalidMessage && (
          <p className="invalid__message">{props.isInvalidMessage}</p>
        )}
        <input
          ref={ref}
          className={props.className || 'form-control__input'}
          type={props.type || 'text'}
          id={props.id}
          value={props.value || ''}
        />
        <label className="form-control__label" htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    );
  }
);

export default FormInput;
