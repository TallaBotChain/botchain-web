import axios from 'axios'
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const BotActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE"
}

export const setInProgress = (inProgress)  => {
  return { type: BotActions.SET_ATTRIBUTE, key: 'inProgress', value: inProgress }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addBot = (url, metadata) => async (dispatch) => {
  let shorten_url = url
  if (url.length > 32) {
    shorten_url = await UrlShortener.shorten(url)
  }
  //NOTE: metadata here is a json string, not an object
  console.log("addDeveloper with url:", shorten_url, " metadata:", metadata);

  //TODO replace this with BotContract
  //let registry = new BotRegistry();
  //registry.addBot(shorten_url, metadata);
}

export const fetchDeveloperMetadata = () => {
}

export const fetchMetamaskAccount = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: BotActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}
