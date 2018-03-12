import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head } from 'react-static';
import DeveloperForm from '../components/developer/DeveloperForm';
import Errors from '../components/Errors';
import FeeModal from '../components/search/FeeModal';
import TxStatus from '../connectors/helpers/TxStatus'

class DeveloperPage extends Component {

  //TODO move MetaMask check code into HOC https://reactjs.org/docs/higher-order-components.html
  constructor(props) {
    super(props);
    this.state = { no_metamask: false, values: null };
    //  api_endpoint: this.props.api_endpoint
  }

  componentDidMount() {
    console.log("kuku")
    if( ! window.web3 ) {
      this.setState({ no_metamask: true, modal_visible: false });
    }
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
        <div className={ ( this.state.no_metamask || this.state.ready ) ? 'hidden' : '' }>
          <h3>BotChain Developer Registration</h3>
          <p>Note : You have to be pre-approved to successfully complete the registration. Please click here to request approval.  Read more about the Developer Registration Process here. </p>
          <Errors errors={this.props.developer.errors} />
          <DeveloperForm onSubmit={this.submit} />
          <FeeModal visible={this.state.modal_visible} okClick={this.okClick}  />
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer,
    transactions: state.txObserver.transactions
  }
}


export default connect(mapStateToProps)(getSiteProps(DeveloperPage));
