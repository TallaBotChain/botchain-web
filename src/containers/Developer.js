import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head } from 'react-static';
import DeveloperForm from '../components/developer/DeveloperForm';
import Errors from '../components/Errors';
import PaymentModal from '../components/developer/PaymentModal';
import TransactionModal from '../components/developer/TransactionModal';
import TxStatus from '../connectors/helpers/TxStatus'
import * as Actions from '../connectors/redux/actions/developerActions';

class DeveloperPage extends Component {

  constructor(props) {
    super(props);
    this.state = { no_metamask: false, payment_modal_visible: false };
  }

  componentDidMount() {
    this.props.fetchMetamaskAccount();
  }

  submit = (values) => {
    console.log(this.props);
    this.setState({payment_modal_visible: true, values: values});
  }

  cancelClick = () => {
    this.setState({payment_modal_visible: false});
  }

  approveClick = () => {
    console.log("Starting approve request");
    this.props.approvePayment();
  }

  continueClick = () => {
    console.log("Sending actual addDeveloper transaction");
    this.props.addDeveloper(this.state.values.metadata_url, this.state.values.metadata);
  }

  render() {

    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div>
          <h1>Botchain Developer Registration</h1>
          <p class='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please click here to request approval.  Read more about the Developer Registration Process here. </p>
          <Errors errors={this.props.developer.errors} />
          <DeveloperForm onSubmit={this.submit} />
          <PaymentModal tx_id={this.props.developer ? this.props.developer.allowanceTxId : null} visible={this.state.payment_modal_visible && (!this.props.developer.allowanceTxMined) } okClick={this.okClick} approveClick={this.approveClick} cancelClick={this.cancelClick}  />
          <TransactionModal tx_id={this.props.developer ? this.props.developer.addDeveloperTxId : null} visible={this.state.payment_modal_visible && this.props.developer.allowanceTxMined && (!this.props.developer.addDeveloperTxMined) } okClick={this.okClick} continueClick={this.continueClick} cancelClick={this.cancelClick}  />
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

const mapDispatchToProps = dispatch => {
  return {
    fetchMetamaskAccount: () => {
      dispatch( Actions.fetchMetamaskAccount() );
    },
    approvePayment: () => {
      let fee = 50.0; // TODO: to config
      dispatch( Actions.approvePayment(fee) );
    },
    addDeveloper: (url, metadata) => {
      dispatch( Actions.addDeveloper(url, metadata) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(DeveloperPage));
