import React, { Component } from 'react';
import { Head } from 'react-static';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Actions from '../connectors/redux/actions/searchActions';
import SearchForm from '../components/search/SearchForm';
import Errors from '../components/Errors';
import FeeModal from '../components/search/FeeModal';
import SearchResults from '../components/search/SearchResults';
import TxStatus from '../connectors/helpers/TxStatus'
import BodyClassName from 'react-body-classname';
import requireMetamask from '../hocs/requireMetamask';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { values: null, modal_visible: false };
    //  api_endpoint: this.props.api_endpoint
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
    this.props.collectPayment(this.props.botcoin_contract, this.state.values.query);
  }

  //TODO move this to seprate component. It can be re-used for dev reg and add bot
  renderTxInfo = () => {
    if (this.props.search.tx_id) {
      let tx_link = <a href={"https://kovan.etherscan.io/tx/"+this.props.search.tx_id} target='_blank'>Transaction</a>
      switch (this.props.transactions[this.props.search.tx_id].status) {
        case TxStatus.SUCCEED:
          return(<h3>{tx_link} is being successfully processed.</h3>)
        case TxStatus.FAILED:
          return(<h3>{tx_link} failed</h3>)
        default:
          return(<h3>{tx_link} is processing. Please wait...</h3>)
      }
    }
  }



render() {
  return (
    <BodyClassName className="home">
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div>
          <Errors errors={this.props.search.errors} />
          <SearchForm onSubmit={this.submit} />
          <FeeModal visible={this.state.modal_visible} okClick={this.okClick}  />
        </div>
        {this.renderTxInfo()}
        {this.props.search.tx_id && this.props.transactions[this.props.search.tx_id].status == TxStatus.SUCCEED && <SearchResults query={this.state.values.query} bots={this.props.search.bots}/>}
      </div>
    </BodyClassName>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    transactions: state.txObserver.transactions
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

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(SearchPage));
