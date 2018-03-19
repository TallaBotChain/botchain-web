import axios from 'axios'
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import { start as startTxObserver } from './txObserverActions';
import { UrlShortener } from '../../google/UrlShortener';
import TxStatus from '../../helpers/TxStatus'


export const DeveloperActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE"
}

export const setInProgress = (inProgress)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'inProgress', value: inProgress }
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
  console.log(ETHERSCAN_URL)
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: DeveloperActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}
