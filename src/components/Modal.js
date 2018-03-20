import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className={ this.props.visible ? 'modal' : 'hidden' }>
        <div className='modal-content'>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
