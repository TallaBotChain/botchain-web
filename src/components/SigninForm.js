import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class SigninForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email" type="email"
          component={renderField} label="Email"
          validate={[ required, email]}
        />
        <button type="submit">Sign In</button>
      </form>
      );
  }
}

SigninForm = reduxForm({
  form: 'signin' // a unique name for this form
})(SigninForm);

export default SigninForm;
