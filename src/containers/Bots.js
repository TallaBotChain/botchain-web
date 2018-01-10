import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import { Link } from 'react-router-dom'
import * as Actions from '../connectors/redux/actions/botActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class BotsPage extends Component {

  componentDidMount() {
    this.props.fetchBots(this.props.api_endpoint, this.props.auth.eth_address)
  }

  render() {
    //if dev record is not approved
    if (!this.props.developerRecord.approved) {
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.bots.allIds.map((hash) => (
            <tr key={hash}>
              <td>{this.props.bots.byHash[hash].name}</td>
              <td>{this.props.bots.byHash[hash].description}</td>
              <td>{this.props.bots.byHash[hash].tags}</td>
              <td>{this.props.bots.byHash[hash].current_version}</td>
              <td>TODO Add status</td>
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
    developerRecord: state.developerRecord,
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

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(BotsPage));
