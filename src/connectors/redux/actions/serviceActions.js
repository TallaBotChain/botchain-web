import axios from 'axios'
import ServiceRegistry from '../../blockchain/ServiceRegistry';
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const ServiceActions = {
  SET_ATTRIBUTE: "SERVICE_SET_ATTRIBUTE",
  PAY_TX_MINED: "SERVICE_PAY_TX_MINED",
  ADD_TX_MINED: "SERVICE_ADD_TX_MINED"
}

export const fetchDeveloperId = () => async (dispatch) => {
  let registry = new DeveloperRegistry(DEVELOPER_REGISTRY_CONTRACT);
  let developerId = await registry.getDeveloperId();
  let approved = await registry.getDeveloperApproval(developerId);
  console.log("Developer id is ", developerId);
  console.log("Developer approval is ", approved);
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'developerApproval', value: approved });
  if( developerId > 0 ) {
    dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'developerId', value: developerId });
    if( ! approved ) {
      dispatch( setErrors(["You have to be an approved developer to register a bot or an AI service. Your account is pending approval. Please try again later."]) );
    }
  }else {
    dispatch( setErrors(["You need to be pre-approved o register a service or an AI service."]) );
  }
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

export const fetchMetamaskAccount = () => async (dispatch) => {
  let registry = new ServiceRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: ServiceActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}

export const resetTxs = () => (dispatch) => {
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'allowanceTxMined', value: false });
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'allowanceTxId', value: null });
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxMined', value: false });
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxId', value: null });
  dispatch( setErrors([]) );
}

const addTxMined = (status) => (dispatch) => {
  dispatch({ type: ServiceActions.ADD_TX_MINED, status });
  dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxMined', value: true });
  if(status == TxStatus.SUCCEED){
    dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'addServiceTxMined', value: true });
    dispatch({ type: ServiceActions.SET_ATTRIBUTE, key: 'successfullyAdded', value: true });
  } else {
    dispatch( setErrors( ["Add service transaction failed."] ));
  }
}

const payTxMined = (status) => (dispatch) => {
  dispatch({ type: ServiceActions.PAY_TX_MINED, status })
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

