import React, { Component } from 'react';
import { Head } from 'react-static';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as SearchActions from '../connectors/redux/actions/searchActions';
import * as MetamaskActions from '../connectors/redux/actions/metamaskActions';
import SearchForm from '../components/search/SearchForm';
import MetamaskErrors from '../components/MetamaskErrors';
import Errors from '../components/Errors';
import FeeModal from '../components/search/FeeModal';
import SearchResults from '../components/search/SearchResults';
import TxStatus from '../connectors/helpers/TxStatus'
import BodyClassName from 'react-body-classname';
import requireMetamask from '../hocs/requireMetamask';
import Loader from '../components/Loader';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { values: null, modal_visible: false };
  }

  componentDidMount() {
    this.props.connectToMetamask();
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
    this.props.collectPayment(this.state.values.query);
  }

  cancelClick = () => {
    this.setState({modal_visible: false});
  }

  //TODO move this to seprate component. It can be re-used for dev reg and add bot
  renderTxInfo = () => {
    if (this.props.search.tx_id) {
      let tx_link = <a href={`${ETHERSCAN_URL}/tx/${this.props.search.tx_id}`} target='_blank'>Transaction</a>
      switch (this.props.transactions[this.props.search.tx_id].status) {
        case TxStatus.SUCCEED:
          return(<h3>{tx_link} has been successfully processed.</h3>)
        case TxStatus.FAILED:
          return(<h3>{tx_link} failed</h3>)
        default:
          return(
          <div>
            <h3>{tx_link} is being processed. Please wait...</h3>
            <Loader />
          </div>
        )
      }
    }
  }



  render() {
    return (
      <BodyClassName className="home">
        <div style={{textAlign: 'center'}}>
          <Head>
            <title>{SITE_TITLE}</title>
          </Head>
          <div>
            <MetamaskErrors metamask={this.props.metamask} />
            <Errors errors={this.props.search.errors} />
            <SearchForm onSubmit={this.submit} />
            <FeeModal visible={this.state.modal_visible} okClick={this.okClick} cancelClick={this.cancelClick} />
          </div>
          {this.renderTxInfo()}
          {this.props.search.tx_id && this.props.transactions[this.props.search.tx_id].status == TxStatus.SUCCEED && <SearchResults isFetching={this.props.search.isFetching} query={this.state.values.query} bots={this.props.search.bots}/>}
        </div>
      </BodyClassName>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    metamask: state.metamask,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connectToMetamask: () => {
      dispatch( MetamaskActions.connectToMetamask());
    },
    collectPayment: (query) => {
      dispatch( SearchActions.setQuery(query) );
      dispatch( SearchActions.collectPayment(SEARCH_PRICE) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(requireMetamask(SearchPage));
