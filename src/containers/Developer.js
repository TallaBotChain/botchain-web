import React, { Component } from 'react';
import { getSiteProps } from 'react-static';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Head } from 'react-static';
import DeveloperForm from '../components/developer/DeveloperForm';
import Errors from '../components/Errors';
import FeeModal from '../components/search/FeeModal';
import TxStatus from '../connectors/helpers/TxStatus'
import * as Actions from '../connectors/redux/actions/developerActions';

class DeveloperPage extends Component {

  constructor(props) {
    super(props);
    this.state = { no_metamask: false, modal_visible: false };
  }

  componentDidMount() {
    this.props.fetchMetamaskAccount();
  }

  submit = (values) => {
    this.setState({modal_visible: true, values: values});
  }

  okClick = () => {
    this.setState({modal_visible: false});
    //TODO remove this.props.urlshortener_api_key from params
    this.props.addDeveloper(this.state.values.metadata_url, this.state.values.metadata, this.props.urlshortener_api_key);
  }

  render() {

    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div>
          <h1>Botchain Developer Registration</h1>
          <p class='alert-info'>Note : You have to be pre-approved to successfully complete the registration. Please click here to request approval.  Read more about the Developer Registration Process here. </p>
          <Errors errors={this.props.developer.errors} />
          <DeveloperForm onSubmit={this.submit} />
          <FeeModal visible={this.state.modal_visible} okClick={this.okClick}  />
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer,
    transactions: state.txObserver.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMetamaskAccount: () => {
      dispatch( Actions.fetchMetamaskAccount() );
    },
    addDeveloper: (values) => {
      dispatch( Actions.addDeveloper(values.metadata_url, "{metadata}" ) );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(getSiteProps(DeveloperPage));
