import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Countries from 'country-list';

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const phone = value =>
  value && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value) ?
  'Invalid phone number' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className='validation-error'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class RegistrationForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" type="text"
          component={renderField} label="Name"
          validate={[ required ]}
        />
        <Field name="description" type="text"
          component={renderField} label="Description"
        />
        <Field name="street_1" type="text"
          component={renderField} label="Street"
          validate={[ required ]}
        />
        <Field name="city" type="text"
          component={renderField} label="City"
          validate={[ required ]}
        />
        <Field name="state" type="text"
          component={renderField} label="State"
          validate={[ required ]}
        />
        <Field name="postal_code" type="text"
          component={renderField} label="Zip code"
          validate={[ required ]}
        />
        <div>
          <label htmlFor="country">Country</label>
          <div>
            <Field name="country" type="text" component="select">
              { Countries().getNames().map( (country) => {
                  return <option key={country} value={country}>{country}</option>
                })
              }
            </Field>
          </div>
        </div>
        <Field name="phone" type="text"
          component={renderField} label="Phone"
          validate={[ required, phone ]}
        />
        <Field name="email" type="email"
          component={renderField} label="Email"
          validate={[ required, email]}
        />
        <button type="submit">Submit</button>
      </form>
      );
  }
}

RegistrationForm = reduxForm({
  form: 'developer_record', // a unique name for this form
  initialValues: {
    country: "United States"
  }
})(RegistrationForm);

export default RegistrationForm;
