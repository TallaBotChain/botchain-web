import axios from 'axios'
import { browserHistory } from 'react-router'

import Botchain from '../../blockchain/Botchain'

export const botActions = {
  SET_BOTS: 'SET_BOTS',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_CREATED: "SET_CREATED",
  SET_ERRORS: 'SET_ERRORS'
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
    if (error.response.status != 404) { // ignore 404
      dispatch(setErrors([error.message]));
    }
    dispatch(setIsFetching(false))
  });
}

export const createBot = (config, accessToken, ethAddress, values) => (dispatch) => {
  let apiEndpoint = config.api_endpoint;

  let botchain = new Botchain(config.contract_address);
  botchain.createBot(values.eth_address,values).then((result) => {
    console.log("Hashed identifier:",result.hashed_identifier);
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
