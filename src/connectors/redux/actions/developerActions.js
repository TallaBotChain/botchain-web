import axios from 'axios'
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const DeveloperActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
  PAY_TX_MINED: "PAY_TX_MINED",
  ADD_TX_MINED: "ADD_TX_MINED"
}

export const setInProgress = (inProgress)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'inProgress', value: inProgress }
}

const setErrors = (errors)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'errors', value: errors }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addDeveloper = (url, metadata) => async (dispatch) => {
  let shorten_url = url
  if (url.length > 32) {
    shorten_url = await UrlShortener.shorten(url, URLSHORTENER_API_KEY);
  }
  //NOTE: metadata here is a json string, not an object
  console.log("addDeveloper with url:", shorten_url, " metadata:", metadata);
  console.log("Developer registry contract:", DEVELOPER_REGISTRY_CONTRACT);
  let registry = new DeveloperRegistry(DEVELOPER_REGISTRY_CONTRACT);
  try {
    let txId = await registry.addDeveloper(shorten_url, metadata);
    dispatch( { type: DeveloperActions.SET_ATTRIBUTE, key: 'addDeveloperTxId', value: txId });
    dispatch(startTxObserver(txId, addTxMined));
  }catch(e) {
    console.log(e);
    dispatch( setErrors( ["Not signed in MetaMask. Request cancelled."] ));
  }
}

export const fetchMetamaskAccount = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: DeveloperActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}

const resetTxs = () => (dispatch) => {
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'allowanceTxMined', value: false });
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'allowanceTxId', value: null });
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'addDeveloperTxMined', value: false });
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'addDeveloperTxId', value: null });
}

const addTxMined = (status) => (dispatch) => {
  dispatch({ type: DeveloperActions.ADD_TX_MINED, status });
  dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'addDeveloperTxMined', value: true });
  if(status == TxStatus.SUCCEED){
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'addDeveloperTxMined', value: true });
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'successfullyAdded', value: true });
  } else {
    dispatch( setErrors( ["Add developer transaction failed."] ));
  }
}

const payTxMined = (status) => (dispatch) => {
  dispatch({ type: DeveloperActions.PAY_TX_MINED, status })
  if(status == TxStatus.SUCCEED){
    console.log("Mined approval transaction");
    dispatch({ type: DeveloperActions.SET_ATTRIBUTE, key: 'allowanceTxMined', value: true });
  }
}

const setPayTxId = (tx_id) => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'allowanceTxId', value: tx_id }
}

export const approvePayment = (amount) => (dispatch) => {
  let botCoin = new BotCoin(BOTCOIN_CONTRACT);
  let chargingContract = DEVELOPER_REGISTRY_CONTRACT; // IS IT?
  botCoin.approve(amount, chargingContract)
  .then( (tx_id) => {
    dispatch(startTxObserver(tx_id, payTxMined))
    return dispatch( setPayTxId(tx_id) );
  }).catch( (err)=> {
    console.log(err);
    dispatch( setErrors( ["Not approved in MetaMask. Request cancelled."] ));
  });
}
