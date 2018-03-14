import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, length, url } from 'redux-form-validators'
import { MetadataValidator } from '../../connectors/validators/MetadataValidator';
import { inputField, textareaField } from '../form/FormFields';
import {connect} from 'react-redux'

const METADATA_ATTRIBUTES = ["name","organization","street_1","street_2","city","state/province","postal_code","country","phone","phone_ext","email","url"]
const REQUIRED_METADATA_ATTRIBUTES = ["name","organization","street_1","city","state/province","postal_code","country","phone","email","url"]

const asyncValidate = (values, dispatch, props) => {
  let mv = new MetadataValidator(METADATA_ATTRIBUTES, REQUIRED_METADATA_ATTRIBUTES)
  return mv.validate(values.metadata_url, props)
}

class DeveloperForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text" readOnly={true}
          component={inputField} label="ETH Address"
          validate={[ required()]}
        />
        <Field name="metadata_url" type="url"
          component={inputField} label="Developer Metadata URL"
          validate={[ required(), length({ max: 132 }), url() ]}
        />
        <Field name="metadata" readOnly={true}
          component={textareaField} label="Will be autoloaded from url above"
          format={value => value ? JSON.stringify(value, null, 2) : "" }
          parse={value => value ? JSON.parse(value) : {}}
          validate={[required()]}
        />
        <button type="submit">Register</button>
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
