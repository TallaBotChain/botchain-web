import React, { Component } from 'react';
import { Head, Link } from 'react-static';


class NoMetamaskPage extends Component {

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <div className="alert">Application requires <a href="https://metamask.io" target="_blank">Metamask</a> to be installed, unlocked and set to the Kovan test network. Read our <Link to="/faq">FAQs</Link> to learn more about Metamask.</div>
      </div>
    )
  }
}

export default NoMetamaskPage
