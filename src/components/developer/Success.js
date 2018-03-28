import React, { Component } from 'react';

class Success extends Component {
  render() {
    return (
      <div className={ this.props.visible ? 'add-developer-success' : 'hidden' }>
        <div className='welcome'>Welcome to Botchain!</div>
        <p>Developer address {this.props.eth_address} has been successfully registered for approval.  </p>
        <p>Once approved, you can register a product or service in Botchain. </p>
        <p>Learn more about:</p>
        <div className='link-buttons'>
          <a href='/add_bot'>Registering a product or bot in Botchain</a>
          <a href='/add_service'>Registering a service in Botchain</a>
        </div>
      </div>
    );
  }
}

export default Success;
