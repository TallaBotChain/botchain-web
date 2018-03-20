import axios from 'axios'
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const DeveloperActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
  TX_MINED: "SEARCH_TX_MINED"
}

export const setInProgress = (inProgress)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'inProgress', value: inProgress }
}

const setErrors = (errors)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'errors', value: errors }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addDeveloper = (url, metadata, urlshortener_api_key) => async (dispatch) => {
  let shorten_url = url
  if (url.length > 32) {
    shorten_url = await UrlShortener.shorten(url, this.props.urlshortener_api_key)
  }
  //NOTE: metadata here is a json string, not an object
  console.log("addDeveloper with url:", shorten_url, " metadata:", metadata);
  let registry = new DeveloperRegistry("0xda4aacc9120ccec230c5d9d0600947052b8bb86c"); // TODO: put real address
  registry.addDeveloper(shorten_url, metadata);
}

export const fetchDeveloperMetadata = () => {
}

export const fetchMetamaskAccount = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: DeveloperActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}

const txMined = (status) => (dispatch) => {
  dispatch({ type: DeveloperActions.TX_MINED, status })
  if(status == TxStatus.SUCCEED){
    console.log("Mined approval transaction");
  }
}

const setTxId = (tx_id) => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'tx_id', value: tx_id }
}

export const approvePayment = (amount) => (dispatch) => {
  // TODO: replace with real contract address from config
  let botCoin = new BotCoin("0xd29b42f0d8e1eb49d74ce7ae63137a0ff034a563");
  let chargingContract = "0xc4F65F5A6e1797cfEAb952B5a582eE21fca0573C"; // TODO: to config
  botCoin.approve(amount, chargingContract)
  .then( (tx_id) => {
    dispatch(startTxObserver(tx_id, txMined))
    return dispatch( setTxId(tx_id) );
  }).catch( (err)=> {
    console.log(err);
    dispatch( setErrors( ["Not approved in MetaMask. Request cancelled."] ));
  });
}

