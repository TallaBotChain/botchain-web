import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head, withRouter } from 'react-static';
import BotForm from '../components/bot/BotForm';
import Errors from '../components/Errors';
import PaymentModal from '../components/bot/PaymentModal';
import TransactionModal from '../components/bot/TransactionModal';
import MetamaskErrors from '../components/MetamaskErrors';
import TxStatus from '../connectors/helpers/TxStatus'
import * as BotActions from '../connectors/redux/actions/botActions';
import * as MetamaskActions from '../connectors/redux/actions/metamaskActions';
import requireMetamask from '../hocs/requireMetamask';
import Success from '../components/bot/Success';

class BotPage extends Component {

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
    if( nextProps.bot.errors.length > 0 ) {
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
    console.log("Sending actual addBot transaction");
    this.props.addBot(this.state.values.eth_address, this.state.values.metadata_url, this.state.values.metadata);

  }

  render() {

    return (
      <div>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div>
          <h1>Bot Registration</h1>
          <Success eth_address={this.props.bot.eth_address} visible={this.props.bot.successfullyAdded} />
          <div className={ this.props.bot.successfullyAdded ? 'hidden' : '' } >
            <p className='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please click here to request approval.  Read more about the Bot Registration Process here. </p>
            <MetamaskErrors metamask={this.props.metamask} />
            <Errors errors={this.props.bot.errors} />
            <BotForm onSubmit={this.submit} />
            <PaymentModal tx_id={this.props.bot.allowanceTxId} visible={this.state.payment_modal_visible && (!this.props.bot.allowanceTxMined) } okClick={this.okClick} approveClick={this.approveClick} cancelClick={this.cancelClick} entryPrice={this.props.bot.entryPrice} />
            <TransactionModal tx_id={this.props.bot.addBotTxId} visible={this.state.payment_modal_visible && this.props.bot.allowanceTxMined && (!this.props.bot.addBotTxMined) } okClick={this.okClick} continueClick={this.continueClick} cancelClick={this.cancelClick}  />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bot: state.bot,
    metamask: state.metamask,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch( BotActions.resetTxs() );
    },
    fetchDeveloperId: () => {
      dispatch( BotActions.fetchDeveloperId() );
    },
    fetchEntryPrice: () => {
      dispatch( BotActions.fetchEntryPrice() );
    },
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    approvePayment: () => {
      dispatch( BotActions.approvePayment() );
    },
    addBot: (ethAddress, url, metadata) => {
      dispatch( BotActions.addBot(ethAddress, url, metadata) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(BotPage));
