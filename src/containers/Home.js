import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import RegistrationForm from '../components/Form';
import {connect} from 'react-redux'
import * as Actions from '../connectors/redux/actions/registerDeveloper'
import Errors from '../components/Errors'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { no_metamask: false };
  }

  componentDidMount() {
    if( ! window.web3 ) {
      this.setState({ no_metamask: true });
    }
  }

  submit = (values) => {
    this.props.requestAccessToken(this.props.api_endpoint, values);
  }

  render() {
    return <div>
      <h1 style={{ textAlign: 'center' }}>Developer registration</h1>
      <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
      <div className={ this.state.no_metamask ? 'hidden' : '' }>
        <Errors errors={this.props.errors} />
        <RegistrationForm onSubmit={this.submit} />
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    errors: state.registerDeveloper.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestAccessToken: (api_endpoint, values) => {
      dispatch(Actions.requestAccessToken(api_endpoint, values));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(HomePage));
