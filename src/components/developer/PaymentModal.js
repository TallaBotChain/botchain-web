import React, { Component } from 'react';
import Modal from '../Modal';
import Loader from '../Loader';

class PaymentModal extends Component {

  constructor(props) {
    super(props);
    this.state = {step: 1};
    this.approveClick = this.approveClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.okClick = this.okClick.bind(this);
  }

  resetState() {
    this.setState({step: 1});
  }

  componentWillReceiveProps(nextProps) {
    let step = this.state.step;
    if( nextProps.approved ) {
      step = 3;
      if( nextProps.completed ) {

      }
    }
  }

  nextStep() {
    let step = (this.state.step + 1)
    this.setState({step: step });
  }

  approveClick() {
    this.props.approveClick();
    this.setState({step: 2});
  }

  cancelClick() {
    this.resetState();
    this.props.cancelClick();
  }

  okClick() {
    this.props.okClick();
    this.resetState();
  }

  render() {
    return (
      <Modal {...this.props} >
        <div className='payment-modal'>
          <div className={ this.state.step == 1 ? '' : 'hidden' }>
            The fee for this transaction is <br />
            <b>50 BOTC</b>.
            Please approve this payment.
            <p className='info'>
              No BOTC tokens will be transferred during this process. A metamask window will popup for you sign and authorize this transaction. To learn more about this process click here.
            </p>
            <button type="button" className="primary" onClick={this.approveClick}>Authorize</button>
            <button type="button" className="" onClick={this.cancelClick}>Cancel</button>
          </div>
          <div className={ this.state.step == 2 ? '' : 'hidden' }>
            <p>Transaction successfully submitted. Waiting for confirmation. Click here to check the status of this transaction.</p>
            <Loader />
            <p>Please do not close this browser window. The Transactions speed depends on the Ethereum Network and can range anywhere from a few seconds to up to an hour.</p>

          </div>
        </div>
      </Modal>
      )
  }
}

export default PaymentModal;
