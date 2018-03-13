import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { fetchMetamaskAccount } from '../../connectors/redux/actions/developerActions';
import {connect} from 'react-redux'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength32 = maxLength(32)

const renderField = ({ input, label, type, meta: { touched, error, warning }, readOnly }) => (
  <div>
    <input {...input} placeholder={label} type={type} readOnly={readOnly}  />
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class DeveloperForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text" readOnly={true}
          component={renderField} label="ETH Address"
          validate={[ required]}
        />
        <Field name="metadata_url" type="url"
          component={renderField} label="Developer Metadata URL"
          validate={[ required, maxLength32 ]}
        />
        <button type="submit">Register</button>
      </form>
      );
  }
}

DeveloperForm = reduxForm({
  form: 'developer' // a unique name for this form
})(DeveloperForm);

DeveloperForm = connect(
  state => ({
    initialValues: state.developer.data // pull initial values from reducer
  })
)(DeveloperForm)

export default DeveloperForm;
