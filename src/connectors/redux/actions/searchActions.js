import axios from 'axios'
//import config from 'config';
import BotCoin from '../../blockchain/BotCoin';

let timer = null;

export const searchActions = {
  SET_BOTS: "SET_BOTS",
  SET_QUERY: "SET_QUERY",
  SET_TX_ID: "SET_TX_ID",
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
  SET_ERRORS: "SET_ERRORS",
  TX_CHECKS_STARTED: 'TX_CHECKS_STARTED',
  TX_CHECKS_STOPPED: 'TX_CHECKS_STOPPED',
  TX_CHECK: 'TX_CHECK_TIMER',
  COLLECT_PAYMENT: "COLLECT_PAYMENT"
}

export const collectPayment = (botcoin_contract, amount, to) => (dispatch) => {
  let botcoin = new BotCoin(botcoin_contract);
  botcoin.pay(amount, to)
    .then( (tx_id) => {
      dispatch( setTxId(tx_id) );
      dispatch(startTransactionChecks(tx_id))
    })
    .catch((err) => {
      console.log(err);
      dispatch( setErrors( ["Not signed by MetaMask. Request cancelled."] ));
    });
}

export const setQuery = (query) => {
  return { type: searchActions.SET_QUERY, key: 'query', value: query }
}

const setErrors = (errors)  => {
  return { type: searchActions.SET_ERRORS, key: 'errors', value: errors }
}

const setBots = (bots)  => {
  return { type: searchActions.SET_BOTS, key: 'bots', value: bots }
}

const setTxId = (tx_id) => {
  return { type: searchActions.SET_TX_ID, key: 'tx_id', value: tx_id }
}

const setTxMined = (mined) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'txMined', value: mined }
}

const setTxSucceed = (success) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'txSucceed', value: success }
}

const setIsFetching = (isFetching) => {
  return { type: searchActions.SET_ATTRIBUTE, key: 'isFetching', value: isFetching }
}

export const searchBots = () => (dispatch, getState) => {
  // TODO - find way to read config from this file
  // let apiEndpoint = config.api_endpoint;
  let api_endpoint = "http://localhost:3001"
  const search = getState().search;

  dispatch(setIsFetching(true))
  console.log("Making API request to search Bots ", api_endpoint);
  axios.get(api_endpoint+"/v1/bots/search", {
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

export const checkTransactionStatus = (tx_id) => (dispatch) => {
  dispatch({ type: searchActions.TX_CHECK })
  let botcoin = new BotCoin();
  if (botcoin.isTxMined(tx_id)) {
    dispatch(setTxMined(true))
    if (botcoin.isTxSucceed(tx_id)) {
      dispatch(setTxSucceed(true))
      dispatch(searchBots())
    }else{
      dispatch(setTxSucceed(false))
    }
    dispatch(stopTransactionChecks())
  }
}

export const startTransactionChecks = (tx_id) => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(checkTransactionStatus(tx_id)), 5000);
  dispatch({ type: searchActions.TX_CHECKS_STARTED })
}

export const stopTransactionChecks = () => (dispatch) => {
  clearInterval(timer);
  dispatch({ type: searchActions.TX_CHECKS_STOPPED })
}
