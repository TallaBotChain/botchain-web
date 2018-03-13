import axios from 'axios'
import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import { start as startTxObserver } from './txObserverActions';
import TxStatus from '../../helpers/TxStatus'


export const DeveloperActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE"
}

export const setInProgress = (inProgress)  => {
  return { type: DeveloperActions.SET_ATTRIBUTE, key: 'inProgress', value: inProgress }
}

export const allowTransfer = () => {}
export const checkTransferAllowance = () => {}

export const addDeveloper = (url, metadata) => async (dispatch) => {
  console.log("addDeveloper with url:", url, " metadata:", metadata);
  let registry = new DeveloperRegistry("0xda4aacc9120ccec230c5d9d0600947052b8bb86c"); // TODO: put real address
  registry.addDeveloper(url, metadata);
}

export const fetchDeveloperMetadata = () => {
}

export const fetchMetamaskAccount = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: DeveloperActions.SET_ATTRIBUTE, key: 'data', value: { 'eth_address': account } });
}
