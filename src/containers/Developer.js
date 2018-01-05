import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class DeveloperPage extends Component {

  render() {
    //if dev record not exist
    if (this.props.developerRecord.hashed_identifier == null) {
     return <Redirect to='/registration'/>
    }

    return <div>
      <h1 style={{ textAlign: 'center' }}>Developer information</h1>
      <div><strong>Name: </strong>{this.props.developerRecord.name}</div>
      <div><strong>Description: </strong>{this.props.developerRecord.description}</div>
      <div><strong>Street: </strong>{this.props.developerRecord.street_1}</div>
      <div><strong>City: </strong>{this.props.developerRecord.city}</div>
      <div><strong>State: </strong>{this.props.developerRecord.state}</div>
      <div><strong>Postal Code: </strong>{this.props.developerRecord.postal_code}</div>
      <div><strong>Phone: </strong>{this.props.developerRecord.phone}</div>
      <div><strong>Email: </strong>{this.props.developerRecord.email}</div>
      <div><strong>Eth address: </strong>{this.props.developerRecord.eth_address}</div>
      <div><strong>Is Approved: </strong>{this.props.developerRecord.approved ? "True" : "False"}</div>
      <div><strong>TODO: </strong>Add link to etherscan</div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    developerRecord: state.developerRecord
  }
}


export default connect(mapStateToProps)(getSiteProps(DeveloperPage));
