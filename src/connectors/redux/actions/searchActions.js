import axios from 'axios'
//import config from 'config';
import BotCoin from '../../blockchain/BotCoin';
import { start as startTxObserver } from './txObserverActions';
import TxStatus from '../../helpers/TxStatus'

let timer = null;

export const searchActions = {
  SET_ATTRIBUTE: "SEARCH_SET_ATTRIBUTE",
  COLLECT_PAYMENT: "SEARCH_COLLECT_PAYMENT",
  TX_MINED: "SEARCH_TX_MINED"
}

export const collectPayment = (amount) => (dispatch) => {
  let botcoin = new BotCoin();
  botcoin.pay(amount, SEARCH_COLLECT_ADDRESS)
    .then( (tx_id) => {
      dispatch(startTxObserver(tx_id, txMined))
      return dispatch( setTxId(tx_id) );
    })
    .catch((err) => {
      console.log(err);
      dispatch( setErrors( ["Not signed by MetaMask. Request cancelled."] ));
    });
}

const txMined = (status) => (dispatch) => {
  dispatch({ type: searchActions.TX_MINED, status })
  if(status == TxStatus.SUCCEED){
    dispatch(searchBots())
  }
}

export const setQuery = (query) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'query', value: query }
}

const setErrors = (errors)  => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'errors', value: errors }
}

const setBots = (bots)  => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'bots', value: bots }
}

const setTxId = (tx_id) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'tx_id', value: tx_id }
}

const setIsFetching = (isFetching) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'isFetching', value: isFetching }
}

const searchBots = () => (dispatch, getState) => {
  const search = getState().search;

  dispatch(setIsFetching(true))
  console.log("Making API request to search Bots ", API_ENDPOINT);
  axios.get(API_ENDPOINT+"/v1/bots/search", {
    params: {
      query: search.query,
      botcoin_tx_hash: search.tx_id
    }
  })
  .then(function(response) {
    dispatch(setIsFetching(false))
    dispatch(setBots(response.data))
  })
  .catch(function(error) {
    if (error.response.status != 404) { // ignore 404
      dispatch(setErrors([error.message]));
    }
    dispatch(setIsFetching(false))
  });
}
