import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators'
import { inputField } from '../form/FormFields';

class SearchForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="query" type="text"
          component={inputField} label="Search Botchain"
          validate={[ required() ]}
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
