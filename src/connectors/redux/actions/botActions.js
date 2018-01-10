import axios from 'axios'
import { browserHistory } from 'react-router'

import Botchain from '../../blockchain/Botchain'

export const botActions = {
  SET_BOTS: 'SET_BOTS',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_TX_ID: "SET_TX_ID",
  SET_ERRORS: 'SET_ERRORS'
}


export const setIsFetching = (isFetching)  => {
  return { type: botActions.SET_IS_FETCHING, key: 'isFetching', value: isFetching }
}

export const setErrors = (errors)  => {
  return { type: botActions.SET_ERRORS, key: 'errors', value: errors }
}

export const setTxId = (tx_id)  => {
  return { type: botActions.SET_TX_ID, key: 'tx_id', value: tx_id }
}

const setBots = (bots)  => {
  return { type: botActions.SET_BOTS, bots: bots }
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
  })
  .catch(function(error) {
    dispatch(setErrors([error.message]));
    dispatch(setIsFetching(false))
  });
}

export const createBot = (config, accessToken, ethAddress, values) => (dispatch) => {
  console.log("Configuration:", config);
  let apiEndpoint = config.api_endpoint;
  console.log("Making API request to create a Bot",apiEndpoint);
  let apiPromise = axios.post(apiEndpoint+"/v1/bots",
  {
      bot: values,
      access_token: accessToken,
      eth_address: ethAddress
  });

  let botchain = new Botchain(config.contract_address);
  let blockchainPromise = botchain.createBot(values.bot_address,values).then((tx_id) => {
    dispatch( setTxId(tx_id) );
    return Primise.resolve();
  });

  Promise.all([apiPromise,blockchainPromise]).then(function(response) {
    browserHistory.push('/bots')
  })
  .catch(function(error) {
    dispatch(setErrors([error.message]));
  });
}
