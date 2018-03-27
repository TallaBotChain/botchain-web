import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head, withRouter, Link } from 'react-static';
import ServiceForm from '../components/service/ServiceForm';
import Errors from '../components/Errors';
import PaymentModal from '../components/shared/PaymentModal';
import TransactionModal from '../components/shared/TransactionModal';
import MetamaskErrors from '../components/MetamaskErrors';
import TxStatus from '../connectors/helpers/TxStatus'
import * as ServiceActions from '../connectors/redux/actions/serviceActions';
import * as MetamaskActions from '../connectors/redux/actions/metamaskActions';
import requireMetamask from '../hocs/requireMetamask';
import Success from '../components/service/Success';

class ServicePage extends Component {

  constructor(props) {
    super(props);
    this.state = { payment_modal_visible: false };
  }

  componentDidMount() {
    this.props.connectToMetamask();
    this.props.fetchEntryPrice();
    this.props.fetchDeveloperId();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if( nextProps.service.errors.length > 0 ) {
      console.log("hiding payment modal");
      this.setState({payment_modal_visible: false});
    }
  }

  submit = (values) => {
    this.props.reset();
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
    console.log("Sending actual addService transaction");
    this.props.addService(this.state.values.eth_address, this.state.values.metadata_url, this.state.values.metadata);

  }

  render() {

    return (
      <div>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div>
          <h1>Service Registration</h1>
          <Success eth_address={this.props.service.eth_address} visible={this.props.service.successfullyAdded} />
          <div className={ this.props.service.successfullyAdded ? 'hidden' : '' } >
            <p className='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please <a href="https://servicechain.talla.com/developers">click here</a> to request approval. Read more about the Service Registration Process <a href="/faq#service_registration" target="_blank">here.</a> </p>
            <MetamaskErrors metamask={this.props.metamask} />
            <Errors errors={this.props.service.errors} />
            <ServiceForm onSubmit={this.submit} />
            <PaymentModal token_balance={this.props.metamask.token_balance} tx_id={this.props.service.allowanceTxId} visible={this.state.payment_modal_visible && (!this.props.service.allowanceTxMined) } okClick={this.okClick} approveClick={this.approveClick} cancelClick={this.cancelClick} entryPrice={this.props.service.entryPrice} />
            <TransactionModal tx_id={this.props.service.addServiceTxId} visible={this.state.payment_modal_visible && this.props.service.allowanceTxMined && (!this.props.service.addServiceTxMined) } okClick={this.okClick} continueClick={this.continueClick} cancelClick={this.cancelClick}  />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    service: state.service,
    metamask: state.metamask,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch( ServiceActions.resetTxs() );
    },
    fetchDeveloperId: () => {
      dispatch( ServiceActions.fetchDeveloperId() );
    },
    fetchEntryPrice: () => {
      dispatch( ServiceActions.fetchEntryPrice() );
    },
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    approvePayment: () => {
      dispatch( ServiceActions.approvePayment() );
    },
    addService: (ethAddress, url, metadata) => {
      dispatch( ServiceActions.addService(ethAddress, url, metadata) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(ServicePage));
