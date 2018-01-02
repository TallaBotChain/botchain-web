import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import RegistrationForm from '../components/form.js';
import Web3 from 'web3';

function toHex(s) {
  var hex = '';
  for(var i=0;i<s.length;i++) { hex += ''+s.charCodeAt(i).toString(16); }
  return "0x"+hex;
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { no_metamask: false };
  }

  componentDidMount() {
    if( ! window.web3 ) {
      this.setState({ no_metamask: true });
    }else {
      this.localWeb3 = new Web3(window.web3.currentProvider);
    }
  }

  submit = (values) => {
    var self = this;
    self.localWeb3.eth.getAccounts().then( (accounts) => {
      var data = toHex("botchain;"+values.email);
      self.localWeb3.currentProvider.sendAsync({ id: 1, method: 'personal_sign', params: [accounts[0], data] },
        function(err,response) {
          if( ! err ) {
            var signature = response.result;
            console.log("signature:", signature);
          } else {
            alert( err );
          }
        });
    });
  }

  render() {
    return <div>
      <h1 style={{ textAlign: 'center' }}>Developer registration</h1>
      <div className={ this.state.no_metamask ? 'warning' : 'hidden' }>Unable to connect to MetaMask</div>
      <div className={ this.state.no_metamask ? 'hidden' : '' }>
        <RegistrationForm onSubmit={this.submit} />
      </div>
    </div>;
  }
}

export default getSiteProps(HomePage);
