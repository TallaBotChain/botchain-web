import React, { Component } from 'react';
import Modal from '../Modal';

class FeeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {step: 1};
    this.nextStep = this.nextStep.bind(this);
    this.okClick = this.okClick.bind(this);
  }

  resetState() {
    this.setState({step: 1});
  }

  nextStep() {
    this.setState({step: 2});
  }

  okClick() {
    this.props.okClick();
    this.resetState();
  }

  render() {
    return (
      <Modal {...this.props} >
        <div className={ this.state.step == 1 ? '' : 'hidden' }>
          The fee for this transaction is <br />
          <b>50 BOTC</b><br/>
          <button type="button" className="primary" onClick={this.nextStep}>Authorize</button>
          <button type="button" onClick={this.nextStep}>Cancel</button>
        </div>
        <div className={ this.state.step == 2 ? '' : 'hidden' }>
          <p>Transferring <b>50 BOTC</b> from your account. A metamask window will popup for you sign and authorize this transaction.</p>
          <button type="button" className="primary" onClick={this.okClick}>Continue</button>
          <p className='info'>
            Please ensure MetaMask is installed, unlocked and set to the Kovan test network.
          </p>
        </div>
      </Modal>
      )
  }
}

export default FeeModal;
