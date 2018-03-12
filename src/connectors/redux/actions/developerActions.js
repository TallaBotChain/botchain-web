import axios from 'axios'
import BotChain from '../../blockchain/BotChain'
import BotCoin from '../../blockchain/BotCoin';
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

export const addDeveloper = () => {}

export const fetchDeveloperMetadata = () => {
  
}
