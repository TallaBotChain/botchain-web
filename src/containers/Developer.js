import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head, withRouter, Link } from 'react-static';
import DeveloperForm from '../components/developer/DeveloperForm';
import Errors from '../components/Errors';
import PaymentModal from '../components/shared/PaymentModal';
import TransactionModal from '../components/shared/TransactionModal';
import MetamaskErrors from '../components/MetamaskErrors';
import TxStatus from '../connectors/helpers/TxStatus'
import * as DeveloperActions from '../connectors/redux/actions/developerActions';
import * as MetamaskActions from '../connectors/redux/actions/metamaskActions';
import requireMetamask from '../hocs/requireMetamask';
import Success from '../components/developer/Success';

class DeveloperPage extends Component {

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
    if( nextProps.developer.errors.length > 0 ) {
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
    console.log("Sending actual addDeveloper transaction");
    this.props.addDeveloper(this.state.values.metadata_url, this.state.values.metadata);
  }

  render() {

    return (
      <div>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div>
          <h1>Botchain Developer Registration</h1>
          <Success eth_address={this.props.developer.eth_address} visible={this.props.developer.successfullyAdded} />
          <div className={ this.props.developer.successfullyAdded ? 'hidden' : '' } >
            <p className='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please <a href="https://botchain.talla.com/developers">click here</a> to request approval. Read more about the Developer Registration Process <a href="/faq#developer_registration" target="_blank">here.</a></p>
            <MetamaskErrors metamask={this.props.metamask} />
            <Errors errors={this.props.developer.errors} />
            {this.props.developer.developerId > 0 && (
              <div className="alert">
                {this.props.metamask.eth_address} is already a registered developer! You can <a href="/add_bot">register a Product</a> now or <a href="/">search</a> for what products are already out there.
              </div>
            )}
            <DeveloperForm onSubmit={this.submit} />
            <PaymentModal token_balance={this.props.metamask.token_balance} tx_id={this.props.developer.allowanceTxId} visible={this.state.payment_modal_visible && (!this.props.developer.allowanceTxMined) } okClick={this.okClick} approveClick={this.approveClick} cancelClick={this.cancelClick} entryPrice={this.props.developer.entryPrice} />
            <TransactionModal tx_id={this.props.developer.addDeveloperTxId} visible={this.state.payment_modal_visible && this.props.developer.allowanceTxMined && (!this.props.developer.addDeveloperTxMined) } okClick={this.okClick} continueClick={this.continueClick} cancelClick={this.cancelClick}  />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer,
    metamask: state.metamask,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch( DeveloperActions.resetTxs() );
    },
    fetchEntryPrice: () => {
      dispatch( DeveloperActions.fetchEntryPrice() );
    },
    fetchDeveloperId: () => {
      dispatch( DeveloperActions.fetchDeveloperId() );
    },
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    approvePayment: () => {
      dispatch( DeveloperActions.approvePayment() );
    },
    addDeveloper: (url, metadata) => {
      dispatch( DeveloperActions.addDeveloper(url, metadata) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(DeveloperPage));
