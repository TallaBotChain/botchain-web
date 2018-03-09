import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import { Head } from 'react-static';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Actions from '../connectors/redux/actions/searchActions';
import SearchForm from '../components/search/SearchForm';
import Errors from '../components/Errors';
import FeeModal from '../components/search/FeeModal';
import SearchResults from '../components/search/SearchResults';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { no_metamask: false, values: null };
    //  api_endpoint: this.props.api_endpoint
  }

  componentDidMount() {
    if( ! window.web3 ) {
      this.setState({ no_metamask: true, modal_visible: false });
    }
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
    this.props.collectPayment(this.props.botcoin_contract,this.state.values.query);
  }

  renderTxInfo = () => {
    if (this.props.search.tx_id) {
      let tx_link = <a href={"https://kovan.etherscan.io/tx/"+this.props.search.tx_id} target='_blank'>Transaction</a>
      let tx_status = this.props.search.txMined ? (this.props.search.txSucceed ? "is being successfully processed." : "failed") : "is processing. Please wait..."
      return(<h3>{tx_link} {tx_status}</h3>)
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div className={ this.state.no_metamask ? 'alert' : 'hidden' }>Unable to connect to MetaMask</div>
        <div className={ ( this.state.no_metamask || this.state.ready ) ? 'hidden' : '' }>
          <Errors errors={this.props.search.errors} />
          <SearchForm onSubmit={this.submit} />
          <FeeModal visible={this.state.modal_visible} okClick={this.okClick}  />
        </div>
        {this.renderTxInfo()}
        {this.props.search.txSucceed && <SearchResults query={this.state.values.query} bots={this.props.search.bots}/>}
      </div>
    )
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
