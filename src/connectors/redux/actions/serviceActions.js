import axios from 'axios'
import ServiceRegistry from '../../blockchain/ServiceRegistry';
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const ServiceActions = {
  RESET_STATE: "SERVICE_RESET_STATE",
  SET_ATTRIBUTE: "SERVICE_SET_ATTRIBUTE"
}

export const fetchEntryPrice = () => async (dispatch) => {
  let registry = new ServiceRegistry(SERVICE_REGISTRY_CONTRACT);
  let price = await registry.getEntryPrice();
  let botCoin = new BotCoin();
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'entryPrice', value: botCoin.convertToHuman(price) });
}

const setErrors = (errors)  => {
  return { type: ServiceActions.SET_ATTRIBUTE, key: 'errors', value: errors }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addService = (ethAddress, url, metadata) => async (dispatch,getState) => {
  let shorten_url = url
  if (url.length > 32) {
    shorten_url = await UrlShortener.shorten(url, URLSHORTENER_API_KEY);
  }
  //NOTE: metadata here is a json string, not an object
  let developerId = getState().service.developerId;
  console.log("addService with developerId:", developerId,"url:", shorten_url, " metadata:", metadata);
  console.log("Service registry contract:", SERVICE_REGISTRY_CONTRACT);
  let registry = new ServiceRegistry(SERVICE_REGISTRY_CONTRACT);
  try {
    let txId = await registry.addService(developerId, ethAddress, shorten_url, metadata);
    dispatch( { type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxId', value: txId });
    dispatch(startTxObserver(txId, addTxMined));
  }catch(e) {
    console.log(e);
    dispatch( setErrors( ["Not signed in MetaMask. Request cancelled."] ));
  }
}

export const resetTxs = () => (dispatch) => {
  dispatch({ type: ServiceActions.RESET_STATE });
}

const addTxMined = (status) => (dispatch) => {
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxMined', value: true });
  if(status == TxStatus.SUCCEED){
    dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'successfullyAdded', value: true });
  } else {
    dispatch( setErrors( ["Add service transaction failed."] ));
  }
}

const payTxMined = (status) => (dispatch) => {
  if(status == TxStatus.SUCCEED){
    console.log("Mined approval transaction");
    dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'allowanceTxMined', value: true });
  }
}

const setPayTxId = (tx_id) => {
  return { type: ServiceActions.SET_ATTRIBUTE, key: 'allowanceTxId', value: tx_id }
}

export const approvePayment = () => (dispatch, getState) => {
  let botCoin = new BotCoin();
  let chargingContract = SERVICE_REGISTRY_CONTRACT;
  let amount = getState().service.entryPrice;
  console.log("Approving for amount ", amount);
  botCoin.approve(amount, chargingContract)
  .then( (tx_id) => {
    dispatch(startTxObserver(tx_id, payTxMined))
    return dispatch( setPayTxId(tx_id) );
  }).catch( (err)=> {
    console.log(err);
    dispatch( setErrors( ["Not approved in MetaMask. Request cancelled."] ));
  });
}
