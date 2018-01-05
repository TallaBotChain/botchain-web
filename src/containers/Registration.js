import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import RegistrationForm from '../components/RegistrationForm';
import {connect} from 'react-redux'
import * as Actions from '../connectors/redux/actions/developerRecord'
import Errors from '../components/Errors'
import { Redirect } from 'react-router-dom'

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = { record_fetched: false };
  }

  componentDidMount() {
    if( ! this.state.record_fetched ) {
      this.props.fetchDevRecord(this.props.api_endpoint, this.props.auth.eth_address)
      this.setState({ record_fetched: true });
    }
  }

  submit = (values) => {
    this.props.createDevRecord(this.props.api_endpoint, this.props.auth.access_token, values);
  }


  render() {
    //Maybe there is better way for redirect on Router level???
    //if unauthorized
    if (this.props.auth.access_token == null) {
     return <Redirect to='/' />
    }
    //if dev record was created
    if (this.props.developerRecord.hashed_identifier) {
     return <Redirect to='/developer' />
    }
    return <div>
      <h1 style={{ textAlign: 'center' }}>Developer registration</h1>
      {this.props.developerRecord.isFetching && (
        <div style={{ textAlign: 'center' }}>Please wait...</div>
      )}
      <div className={ this.props.developerRecord.isFetching ? 'hidden' : '' }>
        <Errors errors={this.props.developerRecord.errors} />
        <RegistrationForm onSubmit={this.submit} />
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    developerRecord: state.developerRecord,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDevRecord: (api_endpoint, eth_address) => {
      dispatch(Actions.fetchDeveloperRecord(api_endpoint, eth_address));
    },
    createDevRecord: (api_endpoint, access_token, values) => {
      dispatch(Actions.createDeveloperRecord(api_endpoint, access_token, values));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(RegistrationPage));
