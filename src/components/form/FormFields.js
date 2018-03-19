import React from 'react';

export const inputField = ({ input, label, type, meta: { asyncValidating, touched, error, warning }, readOnly, placeholder, appendComponent }) => (
  <div className='input'>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} placeholder={placeholder || label} type={type} readOnly={readOnly}  />
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
    {asyncValidating && (<span>validating...</span>)}
    {appendComponent}
  </div>
)

export const textareaField = ({ input, label, readOnly, placeholder, meta: { asyncValidating, touched, error, warning } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <textarea {...input} placeholder={placeholder || label} readOnly={readOnly} rows="12" />
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)
