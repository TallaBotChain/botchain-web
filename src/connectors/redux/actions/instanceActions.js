import axios from 'axios'
import InstanceRegistry from '../../blockchain/InstanceRegistry';
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotRegistry from '../../blockchain/BotRegistry';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const InstanceActions = {
  RESET_STATE: "INSTANCE_RESET_STATE",
  SET_ATTRIBUTE: "INSTANCE_SET_ATTRIBUTE"
}

export const fetchEntryPrice = () => async (dispatch) => {
  let registry = new InstanceRegistry(INSTANCE_REGISTRY_CONTRACT);
  let price = await registry.getEntryPrice();
  let botCoin = new BotCoin();
  dispatch({ type: InstanceActions.SET_ATTRIBUTE, key: 'entryPrice', value: botCoin.convertToHuman(price) });
}

const setErrors = (errors)  => {
  return { type: InstanceActions.SET_ATTRIBUTE, key: 'errors', value: errors }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addInstance = (botAddress, ethAddress, url, metadata) => async (dispatch,getState) => {
  let shorten_url = url
  if (url.length > 32) {
    shorten_url = await UrlShortener.shorten(url, URLSHORTENER_API_KEY);
  }
  let botRegistry = new BotRegistry(BOT_REGISTRY_CONTRACT);
  try {
    var botId = await botRegistry.botEntryIdForAddress(botAddress);
    console.log("Found botId ",botId);
  }catch(e) {
    console.log(e);
    dispatch( setErrors( ["Can't find bot with address "+botAddress] ));
  }
  //NOTE: metadata here is a json string, not an object
  console.log("addInstance with botId:", botId,"url:", shorten_url, " metadata:", metadata);
  console.log("Instance registry contract:", INSTANCE_REGISTRY_CONTRACT);
  let registry = new InstanceRegistry(INSTANCE_REGISTRY_CONTRACT);
  try {
    let txId = await registry.addInstance(botId, ethAddress, shorten_url, metadata);
    dispatch( { type: InstanceActions.SET_ATTRIBUTE, key: 'addInstanceTxId', value: txId });
    dispatch(startTxObserver(txId, addTxMined));
  }catch(e) {
    console.log(e);
    dispatch( setErrors( ["Not signed in MetaMask. Request cancelled."] ));
  }
}

export const resetTxs = () => (dispatch) => {
  dispatch({ type: InstanceActions.RESET_STATE });
}

const addTxMined = (status) => (dispatch) => {
  dispatch({ type: InstanceActions.SET_ATTRIBUTE, key: 'addInstanceTxMined', value: true });
  if(status == TxStatus.SUCCEED){
    dispatch({ type: InstanceActions.SET_ATTRIBUTE, key: 'successfullyAdded', value: true });
  } else {
    dispatch( setErrors( ["Add instance transaction failed."] ));
  }
}

const payTxMined = (status) => (dispatch) => {
  if(status == TxStatus.SUCCEED){
    console.log("Mined approval transaction");
    dispatch({ type: InstanceActions.SET_ATTRIBUTE, key: 'allowanceTxMined', value: true });
  }
}

const setPayTxId = (tx_id) => {
  return { type: InstanceActions.SET_ATTRIBUTE, key: 'allowanceTxId', value: tx_id }
}

export const approvePayment = () => (dispatch, getState) => {
  let botCoin = new BotCoin();
  let chargingContract = INSTANCE_REGISTRY_CONTRACT;
  let amount = getState().instance.entryPrice;
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
