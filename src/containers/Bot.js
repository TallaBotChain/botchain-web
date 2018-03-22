import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head } from 'react-static';
import BotForm from '../components/bot/BotForm';
import Errors from '../components/Errors';
import MetamaskErrors from '../components/MetamaskErrors';
import FeeModal from '../components/search/FeeModal';
import TxStatus from '../connectors/helpers/TxStatus'
import * as BotActions from '../connectors/redux/actions/botActions';
import * as MetaMaskActions from '../connectors/redux/actions/metamaskActions';
import requireMetamask from '../hocs/requireMetamask';

class BotPage extends Component {

  constructor(props) {
    super(props);
    this.state = { modal_visible: false };
  }

  componentDidMount() {
    this.props.connectToMetamask();
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
    this.props.addBot(this.state.values.metadata_url, this.state.values.metadata);
  }

  render() {

    return (
      <div>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div>
          <h1>Botchain Bot Registration</h1>
          <p className='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please click here to request approval.  Read more about the Developer Registration Process here. </p>
          <MetamaskErrors metamask={this.props.metamask} />
          <Errors errors={this.props.developer.errors} />
          <BotForm onSubmit={this.submit} />
          <FeeModal visible={this.state.modal_visible} okClick={this.okClick}  />
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer,
    bot: state.bot,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    addDeveloper: (url, metadata) => {
      dispatch( BotActions.addBot(url, metadata ) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(BotPage));
