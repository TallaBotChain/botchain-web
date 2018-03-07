import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class SearchForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="query" type="text"
          component={renderField} label="Search BotChain"
          validate={[ required]}
        />
        <button type="submit">Search</button>
      </form>
      );
}
}

SearchForm = reduxForm({
  form: 'search' // a unique name for this form
})(SearchForm);

export default SearchForm;
