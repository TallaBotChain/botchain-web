import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, length, url } from 'redux-form-validators'
import { MetadataValidator } from '../../connectors/validators/MetadataValidator';
import BotAddressValidator from '../../connectors/validators/BotAddressValidator';
import { inputField, textareaField } from '../form/FormFields';
import {connect} from 'react-redux'

const REQUIRED_METADATA_ATTRIBUTES = ["developer_id","description","tags"]

const validateMetadata = (value) => {
  let mv = new MetadataValidator(REQUIRED_METADATA_ATTRIBUTES)
  return mv.validate(value)
}

const validateBotAddress = (value) => {
  let botValidator = new BotAddressValidator();
  return botValidator.validate(value);
}

const asyncValidate = (values, dispatch, props) => {
  MetadataValidator.fetch(values.metadata_url, props);
  return BotAddressValidator.validate(values.bot_address, props);
}

class InstanceForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="bot_address" type="text"
          component={inputField} label="Bot Address" placeholder="0x000..."
          validate={[ required()]}
        />
        <Field name="eth_address" type="text"
          component={inputField} label="Instance Address" placeholder="0x000..."
          validate={[ required()]}
        />
        <Field name="metadata_url" type="url"
          component={inputField} label="Instance Metadata URL" placeholder="https://example.com/..."
          validate={[ required(), length({ max: 132 }), url() ]}
          // appendComponent={<MetadataTooltip />}
        />
        <Field name="metadata"
          component={textareaField} label="Metadata" placeholder="Will be autoloaded from url above"
          validate={[required(), validateMetadata]}
        />
        <button className='primary' type="submit">Add Instance</button>
      </form>
    );
  }
}

InstanceForm = reduxForm({
  form: 'instance', // a unique name for this form,
  asyncValidate,
  asyncBlurFields: ['metadata_url','bot_address']
})(InstanceForm);

export default InstanceForm;
