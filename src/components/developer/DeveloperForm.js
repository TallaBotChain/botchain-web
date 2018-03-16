import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, length, url } from 'redux-form-validators'
import { MetadataValidator } from '../../connectors/validators/MetadataValidator';
import { inputField, textareaField } from '../form/FormFields';
import {connect} from 'react-redux'
import MetadataTooltip from './MetadataTooltip';

const REQUIRED_METADATA_ATTRIBUTES = ["name","organization","street_1","city","state/province","postal_code","country","phone","email","url"]

const validateMetadata = (value) => {
  let mv = new MetadataValidator(REQUIRED_METADATA_ATTRIBUTES)
  return mv.validate(value)
}

const asyncValidate = (values, dispatch, props) => {
  return MetadataValidator.fetch(values.metadata_url, props)
}

class DeveloperForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text" readOnly={true}
          component={inputField} label="ETH Address" placeholder="0x000..."
          validate={[ required()]}
        />
        <Field name="metadata_url" type="url"
          component={inputField} label="Developer Metadata URL" placeholder="https://example.com/..."
          validate={[ required(), length({ max: 132 }), url() ]}
          appendComponent={<MetadataTooltip />}
        />
        <Field name="metadata"
          component={textareaField} label="Metadata" placeholder="Will be autoloaded from url above"
          validate={[required(), validateMetadata]}
        />
        <button className='primary' type="submit">Register</button>
      </form>
    );
  }
}

DeveloperForm = reduxForm({
  form: 'developer', // a unique name for this form,
  asyncValidate,
  asyncBlurFields: ['metadata_url']
})(DeveloperForm);

DeveloperForm = connect(
  state => ({
    initialValues: state.developer.data // pull initial values from reducer
  })
)(DeveloperForm)

export default DeveloperForm;
