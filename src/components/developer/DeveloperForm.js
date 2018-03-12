import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class DeveloperForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text"
          component={renderField} label="ETH Address"
          validate={[ required]}
        />
        <Field name="metadata_url" type="url"
          component={renderField} label="Developer Metadata URL"
          validate={[ required]}
        />
        <button type="submit">Register</button>
      </form>
      );
  }
}

DeveloperForm = reduxForm({
  form: 'developer' // a unique name for this form
})(DeveloperForm);

export default DeveloperForm;
