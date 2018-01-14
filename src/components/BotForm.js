import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required'
const address = value =>
  value && !/^(0x)?[0-9a-f]{40}$/i.test(value) ?
  'Invalid ethereum address' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class BotForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text"
          component={renderField} label="Bot Address"
          validate={[ required, address ]}
        />
        <Field name="name" type="text"
          component={renderField} label="Name"
          validate={[ required ]}
        />
        <Field name="description" type="text"
          component={renderField} label="Description"
          validate={[ required ]}
        />
        <Field name="tags" type="text"
          component={renderField} label="Tags"
          validate={[ required ]}
        />
        <Field name="current_version" type="text"
          component={renderField} label="Version"
          validate={[ required ]}
        />
        <button type="submit">Create</button>
      </form>
      );
  }
}

BotForm = reduxForm({
  form: 'bot' // a unique name for this form
})(BotForm);

export default BotForm;
