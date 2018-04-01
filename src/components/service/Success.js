import React, { Component } from 'react';

class Success extends Component {
  render() {
    return (
      <div className={ this.props.visible ? 'add-developer-success' : 'hidden' }>
        <div className='welcome'>Congratulations!</div>
        <p>The service has been successfully registered.  </p>
        <a className='button' href='/add_service'>Add another service</a>
      </div>
    );
  }
}

export default Success;
