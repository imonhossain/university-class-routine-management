/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

type type = 'text' | 'number' | 'text' | 'email';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  description?: string;
  gapClass?: string;
  titleClass?: string;
  children?: React.ReactNode;
  type?: type;
  error?: string;
}
const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    title,
    description,
    gapClass = 'mb-[39px]',
    name,
    children,
    type,
    titleClass = '',
    error,
    ...otherProps
  },
  ref,
) => {
  return (
    <div className={`form-group ${gapClass}`}>
      {title && <label className={`form-group-label-bold ${titleClass}`}>{title}</label>}
      {description && <em className="form-group-description">{description}</em>}
      {!children ? <input className="form-control" {...otherProps} name={name} type={type} ref={ref} /> : children}
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

const FormGroupInput = React.forwardRef(Input);

export default FormGroupInput;
