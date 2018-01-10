import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import { Head } from 'react-static';
import SigninForm from '../components/SigninForm';
import {connect} from 'react-redux'
import * as Actions from '../connectors/redux/actions/authorizeUser'
import Errors from '../components/Errors'
import { Redirect } from 'react-router-dom'

class SigninPage extends Component {
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
    this.props.requestAccessToken(this.props.api_endpoint, values.email);
  }

  render() {
    //if authorized
    if (this.props.auth.access_token != null && this.props.auth.eth_address != null) {
     return <Redirect to='/registration' />
    }
    return <div>
      <Head>
        <title>{this.props.title}</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
      <div className={ this.state.no_metamask ? 'hidden' : '' }>
        <Errors errors={this.props.auth.errors} />
        <SigninForm onSubmit={this.submit} />
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestAccessToken: (api_endpoint, email) => {
      dispatch(Actions.requestAccessToken(api_endpoint, email));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(SigninPage));
