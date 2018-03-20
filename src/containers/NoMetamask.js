import React, { Component } from 'react';
import { Head } from 'react-static';


class NoMetamaskPage extends Component {

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div className="alert">Unable to connect to MetaMask</div>
        <div>Follow <a href="https://metamask.io" target="_blank">this link</a> to install MetaMask</div>
      </div>
    )
  }
}

export default NoMetamaskPage
