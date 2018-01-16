import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import BotForm from '../components/BotForm';
import {connect} from 'react-redux'
import * as Actions from '../connectors/redux/actions/botActions'
import { Redirect } from 'react-router-dom'
import Errors from '../components/Errors'

class CreateBotPage extends Component {


  submit = (values) => {
    let config = {
      api_endpoint: this.props.api_endpoint,
      contract_address: this.props.botchain_contract
    }
    this.props.createBot( config, this.props.auth.access_token, this.props.auth.eth_address, values)
  }

  render() {
    //if dev record is not approved
    if (!this.props.developerRecord.approved) {
      return <Redirect to='/developer'/>
    }

    if (this.props.bots.created) {
      this.props.resetCreated();
      return <Redirect to='/bots'/>
    }

    return <div>
      <h1 style={{ textAlign: 'center' }}>Create a Bot</h1>
      <Errors errors={this.props.bots.errors} />
      <BotForm onSubmit={this.submit} />
    </div>
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    developerRecord: state.developerRecord,
    bots: state.bots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetCreated: () => {
      dispatch(Actions.setCreated(false));
    },
    createBot: (api_endpoint, access_token, eth_address, values) => {
      dispatch(Actions.createBot(api_endpoint, access_token, eth_address, values));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(getSiteProps(CreateBotPage));
