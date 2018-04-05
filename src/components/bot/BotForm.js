import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, length, url } from 'redux-form-validators'
import { MetadataValidator } from '../../connectors/validators/MetadataValidator';
import { inputField, textareaField } from '../form/FormFields';
import {connect} from 'react-redux'
//import MetadataTooltip from './MetadataTooltip';

const REQUIRED_METADATA_ATTRIBUTES = ["bot_name","bot_description","bot_tags","current_version","developer_eth_address"]

const validateMetadata = (value) => {
  let mv = new MetadataValidator(REQUIRED_METADATA_ATTRIBUTES)
  return mv.validate(value)
}

const asyncValidate = (values, dispatch, props) => {
  return MetadataValidator.fetch(values.metadata_url, props)
}

class BotForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="eth_address" type="text"
          component={inputField} label="ETH Address" placeholder="0x000..."
          validate={[ required()]}
        />
        <Field name="metadata_url" type="url"
          component={inputField} label="Bot Metadata URL" placeholder="https://example.com/..."
          validate={[ required(), length({ max: 132 }), url() ]}
          // appendComponent={<MetadataTooltip />}
        />
        <Field name="metadata"
          component={textareaField} label="Metadata" placeholder="Will be autoloaded from url above"
          validate={[required(), validateMetadata]}
        />
        <button className='primary' type="submit">Add Bot</button>
      </form>
    );
  }
}

BotForm = reduxForm({
  form: 'bot', // a unique name for this form,
  asyncValidate,
  asyncBlurFields: ['metadata_url']
})(BotForm);

export default BotForm;
