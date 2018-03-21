import React, { Component } from 'react';

class Success extends Component {
  render() {
    return (
      <div className={ this.props.visible ? 'add-developer-success' : 'hidden' }>
        <div className='welcome'>Congratulations!</div>
        <p>The bot product has been successfully registered.  </p>
      </div>
    );
  }
}

export default Success;
