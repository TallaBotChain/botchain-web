import axios from 'axios'
import { browserHistory } from 'react-router'
import BotChain from '../../blockchain/BotChain'

let timers = {};

export const botActions = {
  SET_BOTS: 'SET_BOTS',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_CREATED: "SET_CREATED",
  SET_ERRORS: 'SET_ERRORS',
  TX_CHECKS_STARTED: 'TX_CHECKS_STARTED',
  TX_CHECKS_STOPPED: 'TX_CHECKS_STOPPED',
  TX_CHECK: 'TX_CHECK',
  SET_BOT_ATTRIBUTE: 'SET_BOT_ATTRIBUTE'
}


export const setIsFetching = (isFetching)  => {
  return { type: botActions.SET_IS_FETCHING, key: 'isFetching', value: isFetching }
}

export const setErrors = (errors)  => {
  return { type: botActions.SET_ERRORS, key: 'errors', value: errors }
}

export const setCreated = (value)  => {
  return { type: botActions.SET_CREATED, key: 'created', value: value }
}

const setBots = (bots)  => {
  return { type: botActions.SET_BOTS, bots: bots }
}

const updateBotStatus = (eth_address, status)  => {
  return { type: botActions.SET_BOT_ATTRIBUTE, eth_address: eth_address, key: 'status', value: status }
}

export const fetchBots = (api_endpoint, eth_address) => (dispatch) => {
  dispatch(setIsFetching(true))
  console.log("Making API request to get list of Bots", api_endpoint);
  axios.get(api_endpoint+"/v1/bots", {
    params: {
      eth_address: eth_address
    }
  })
  .then(function(response) {
    dispatch(setIsFetching(false))
    dispatch(setBots(response.data))
    response.data.map((bot) => {
      if (bot.eth_address && bot.latest_transaction_address) {
          dispatch(startTransactionChecks(bot.eth_address, bot.latest_transaction_address))
      }
    })
  })
  .catch(function(error) {
    if (error.response.status != 404) { // ignore 404
      dispatch(setErrors([error.message]));
    }
    dispatch(setIsFetching(false))
  });
}

export const createBot = (config, accessToken, ethAddress, values) => (dispatch) => {
  let apiEndpoint = config.api_endpoint;

  let botchain = new BotChain(config.contract_address);
  botchain.createBot(values.eth_address,values).then((result) => {
    console.log("Hashed identifier:",result.hashed_identifier);
    console.log("Transaction id:",result.tx_id);
    console.log("Making API request to create a Bot",apiEndpoint);
    values.hashed_identifier = result.hashed_identifier;
    values.tags = Array.isArray(values.tags) ? values.tags : values.tags.split(',');
    return axios.post(apiEndpoint+"/v1/bots",
    {
      bot: values,
      access_token: accessToken,
      tx_hash: result.tx_id
    }).then((response) => {
      console.log("API response:",response);
      if( response.data.success ) {
        dispatch(setCreated(true));
        return Promise.resolve();
      }
    });
  }).catch(function(error) {
    dispatch(setErrors([error.message]));
  });

}

export const checkTransactionStatus = (eth_address, tx_id) => (dispatch) => {
  dispatch({ type: botActions.TX_CHECK })
  let botchain = new BotChain();
  if (botchain.isTxMined(tx_id)) {
    if (botchain.isTxSucceed(tx_id)) {
      dispatch(updateBotStatus(eth_address, 'Succeed'))
    }else{
      dispatch(updateBotStatus(eth_address, 'Failed'))
    }
    dispatch(stopTransactionChecks(eth_address))
  }
}

export const startTransactionChecks = (eth_address, tx_id) => (dispatch) => {
  clearInterval(timers[eth_address]);
  timers[eth_address] = setInterval(() => dispatch(checkTransactionStatus(eth_address, tx_id)), 5000);
  dispatch({ type: botActions.TX_CHECKS_STARTED })
}

export const stopTransactionChecks = (eth_address) => (dispatch) => {
  clearInterval(timers[eth_address]);
  dispatch({ type: botActions.TX_CHECKS_STOPPED })
}
