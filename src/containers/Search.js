import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import { Head } from 'react-static';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Actions from '../connectors/redux/actions/searchActions';
import SearchForm from '../components/SearchForm';
import Errors from '../components/Errors';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { no_metamask: false, ready: false};
    //  api_endpoint: this.props.api_endpoint
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
    this.props.collectPayment(this.props.botcoin_contract,values.query);
  }

  render() {
    return <div style={{textAlign: 'center'}}>
      <Head>
        <title>{this.props.title}</title>
      </Head>
      <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
      <div className={ ( this.state.no_metamask || this.state.ready ) ? 'hidden' : '' }>
        <Errors errors={this.props.search.errors} />
        <SearchForm onSubmit={this.submit} />
      </div>
      <div className={ this.state.ready ? '' : 'hidden' }>
        <p>Transferring <b>50 tokens</b> from your account.</p><p> A metamask window will popup for you sign and authorize this transaction</p>
        <button onClick={ this.submit }>Continue</button>
      </div>
      <div className={ this.props.search.tx_id ? '' : 'hidden' }>
        <p>
          Transaction is being processed, click following link to see details: </p>
        <a href={"https://kovan.etherscan.io/tx/"+this.props.search.tx_id} target='_blank'>{ this.props.search.tx_id }</a>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    collectPayment: (botcoin_contract,query) => {
      dispatch( Actions.setQuery(query) );
      dispatch( Actions.collectPayment(botcoin_contract, 50 /*TODO: replace this*/, "0xc4F65F5A6e1797cfEAb952B5a582eE21fca0573C" /*TODO: replace this */ ) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(SearchPage));
