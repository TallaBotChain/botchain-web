import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as Actions from '../connectors/redux/actions/botActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import requireMetamask from '../hocs/requireMetamask';

class BotsPage extends Component {

  componentDidMount() {
    if (this.props.developer.approved) {
        this.props.fetchBots(this.props.api_endpoint, this.props.auth.eth_address)
    }
  }

  render() {
    //if dev record is not approved
    if (!this.props.developer.approved) {
      return <Redirect to='/developer'/>
    }

    return <div>
      <h1 style={{ textAlign: 'center' }}>Bots</h1>
      <p>
        <Link to="/bot/new">Add Bot</Link>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Version</th>
            <th>Last Tx</th>
            <th>Last Tx Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.bots.allIds.map((hash) => (
            <tr key={hash}>
              <td>{this.props.bots.byHash[hash].name}</td>
              <td>{this.props.bots.byHash[hash].description}</td>
              <td>{this.props.bots.byHash[hash].tags}</td>
              <td>{this.props.bots.byHash[hash].current_version}</td>
              <td><a target="_blank" href={`${this.props.etherscan_url}/tx/${this.props.bots.byHash[hash].latest_transaction_address}`}>View on Ethersan</a></td>
              <td>{this.props.bots.byHash[hash].status ? this.props.bots.byHash[hash].status : "Checking Tx status..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    developer: state.developer,
    bots: state.bots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBots: (api_endpoint, eth_address) => {
      dispatch(Actions.fetchBots(api_endpoint, eth_address));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(BotsPage));
