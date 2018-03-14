import React from 'react';

export const inputField = ({ input, label, type, meta: { asyncValidating, touched, error, warning }, readOnly }) => (
  <div>
    <input {...input} placeholder={label} type={type} readOnly={readOnly}  />
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
    {asyncValidating && (<span>validating...</span>)}
  </div>
)

export const textareaField = ({ input, label, readOnly, meta: { asyncValidating, touched, error, warning } }) => (
  <div>
    <textarea {...input} placeholder={label} readOnly={readOnly} rows="12" />
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)
