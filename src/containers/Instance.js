import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head, withRouter, Link } from 'react-static';
import InstanceForm from '../components/instance/InstanceForm';
import Errors from '../components/Errors';
import NotDeveloperError from '../components/developer/NotDeveloperError';
import PendingApprovalError from '../components/developer/PendingApprovalError';
import PaymentModal from '../components/shared/PaymentModal';
import TransactionModal from '../components/shared/TransactionModal';
import MetamaskErrors from '../components/MetamaskErrors';
import TxStatus from '../connectors/helpers/TxStatus'
import * as InstanceActions from '../connectors/redux/actions/instanceActions';
import * as MetamaskActions from '../connectors/redux/actions/metamaskActions';
import * as DeveloperActions from '../connectors/redux/actions/developerActions';
import requireMetamask from '../hocs/requireMetamask';
import Success from '../components/instance/Success';

class InstancePage extends Component {

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
    if( nextProps.instance.errors.length > 0 ) {
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
    console.log("Sending actual addInstance transaction");
    this.props.addInstance(this.state.values.bot_address, this.state.values.eth_address, this.state.values.metadata_url, this.state.values.metadata);

  }

  render() {

    return (
      <div>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div>
          <h1>Bot Instance Registration</h1>
          <Success eth_address={this.props.instance.eth_address} visible={this.props.instance.successfullyAdded} />
          <div className={ this.props.instance.successfullyAdded ? 'hidden' : '' } >
            {!this.props.developer.developerApproval && (
              <p className='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please <a href="https://instancechain.talla.com/developers">click here</a> to request approval. Read more about the Bot Instance Registration Process <a href="/faq#instance_registration" target="_blank">here.</a> </p>
            )}
            <MetamaskErrors metamask={this.props.metamask} />
            <Errors errors={this.props.instance.errors} />
            {this.props.developer.developerId == 0 && <NotDeveloperError />}
            {this.props.developer.developerId > 0 && !this.props.developer.developerApproval && <PendingApprovalError />}
            <InstanceForm onSubmit={this.submit} />
            <PaymentModal token_balance={this.props.metamask.token_balance} tx_id={this.props.instance.allowanceTxId} visible={this.state.payment_modal_visible && (!this.props.instance.allowanceTxMined) } okClick={this.okClick} approveClick={this.approveClick} cancelClick={this.cancelClick} entryPrice={this.props.instance.entryPrice} />
            <TransactionModal tx_id={this.props.instance.addInstanceTxId} visible={this.state.payment_modal_visible && this.props.instance.allowanceTxMined && (!this.props.instance.addInstanceTxMined) } okClick={this.okClick} continueClick={this.continueClick} cancelClick={this.cancelClick}  />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    instance: state.instance,
    metamask: state.metamask,
    developer: state.developer,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch( InstanceActions.resetTxs() );
    },
    fetchDeveloperId: () => {
      dispatch( DeveloperActions.fetchDeveloperId() );
    },
    fetchEntryPrice: () => {
      dispatch( InstanceActions.fetchEntryPrice() );
    },
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    approvePayment: () => {
      dispatch( InstanceActions.approvePayment() );
    },
    addInstance: (botAddress, ethAddress, url, metadata) => {
      dispatch( InstanceActions.addInstance(botAddress, ethAddress, url, metadata) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(InstancePage));
