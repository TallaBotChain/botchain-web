import React, { Component } from 'react';
import Modal from '../Modal';
import Loader from '../Loader';

class TransactionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {step: 1};
    this.continueClick = this.continueClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.tx_id ) {
      this.setState({step: 2});
    } else {
      this.setState({step: 1});
    }
  }

  resetState() {
    this.setState({step: 1});
  }

  nextStep() {
    let step = (this.state.step + 1)
    this.setState({step: step });
  }

  continueClick() {
    this.props.continueClick();
  }

  cancelClick() {
    this.resetState();
    this.props.cancelClick();
  }

  render() {
    return (
      <Modal {...this.props} >
        <div className='payment-modal'>
          <div className={ this.state.step == 1 ? '' : 'hidden' }>
            <h2> Finalizing Transaction!</h2>
            <p> A metamask window will popup for you sign and authorize this transaction.</p>
            <p className='info'>
              BOTC tokens will be transferred from your account during this process. Please ensure MetaMask is installed, unlocked and set to the Kovan test network. To learn more about this process click here.
            </p>
            <button type="button" className="primary" onClick={this.continueClick}>Continue</button>
            <button type="button" className="" onClick={this.cancelClick}>Cancel</button>
          </div>
          <div className={ this.state.step == 2 ? '' : 'hidden' }>
            <p>Transaction successfully submitted. Waiting for confirmation. <a href={"http://kovan.etherscan.io/tx/"+this.props.tx_id} target='_blank'>Click here</a>  to check the status of this transaction.</p>
            <Loader />
            <p className='warning'>Please do not close this browser window. The Transactions speed depends on the Ethereum Network and can range anywhere from a few seconds to up to an hour.</p>
          </div>
        </div>
      </Modal>
      )
  }
}

export default TransactionModal;
