import axios from 'axios'
import BotCoin from '../../blockchain/BotCoin';

export const searchActions = {
  SET_BOTS: "SET_BOTS",
  SET_QUERY: "SET_QUERY",
  SET_TX_ID: "SET_TX_ID",
  SET_ERRORS: "SET_ERRORS",
  SEARCH_CHECKS_STARTED: "SEARCH_CHECKS_STARTED",
  SEARCH_CHECKS_STOPPED: "SEARCH_CHECKS_STOPPED",
  SEARCH_CHECK: "SEARCH_TIMER",
  COLLECT_PAYMENT: "COLLECT_PAYMENT"
}

export const collectPayment = (botcoin_contract, amount, to) => (dispatch) => {
  let botcoin = new BotCoin(botcoin_contract);
  botcoin.pay(amount, to)
    .then( (tx_id) => {
      dispatch( setTxId(tx_id) );
    })
    .catch((err) => {
      dispatch( setErrors( ["Request cancelled"] ));
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

