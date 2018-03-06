import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import { Head } from 'react-static';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { no_metamask: false, tx_id: null, ready: false };
  }

  componentDidMount() {
    if( ! window.web3 ) {
      this.setState({ no_metamask: true });
    }
  }

  ready = () => {
    this.setState({ ready: true });
  }

  submit = (values) => {
    let lucky = new Lucky();
    lucky.pay()
      .then((tx_id) => {
        this.setState({tx_id: tx_id});
      })
      .catch((err)=> { alert(err.message); });
  }

  render() {
    return <div style={{textAlign: 'center'}}>
      <Head>
        <title>{this.props.title}</title>
      </Head>
      <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
      <div className={ ( this.state.no_metamask || this.state.ready ) ? 'hidden' : '' }>
        <input placeholder="Search BotChain" />
        <button onClick={ this.ready }>Submit</button>
      </div>
      <div className={ this.state.ready ? '' : 'hidden' }>
        <p>Transferring <b>50 tokens</b> from your account to <b>0xCED373380A875AC7650EA0aC78CBDCF62Da7f9A2</b> account.</p><p> A metamask window will popup for you sign and authorize this transaction</p>
        <button onClick={ this.submit }>Continue</button>
      </div>
      <div className={ this.state.tx_id ? '' : 'hidden' }>
        <p>
          Transaction is being processed, click following link to see details: </p>
        <a href={"https://ropsten.etherscan.io/tx/"+this.state.tx_id} target='_blank'>{ this.state.tx_id }</a>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(SearchPage));
