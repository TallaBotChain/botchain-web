import axios from 'axios'
import Web3 from 'web3'
import { browserHistory } from 'react-router'

export const botActions = {
  SET_BOTS: 'SET_BOTS',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_ERRORS: 'SET_ERRORS'
}


export const setIsFetching = (isFetching)  => {
  return { type: botActions.SET_IS_FETCHING, key: 'isFetching', value: isFetching }
}

export const setErrors = (errors)  => {
  return { type: botActions.SET_ERRORS, key: 'errors', value: errors }
}

const setBots = (bots)  => {
  return { type: botActions.SET_BOTS, bots: bots }
}

export const fetchBots = (api_endpoint, eth_address) => (dispatch) => {
  dispatch(setIsFetching(true))
  console.log("Making API request to get list of Bots", api_endpoint);
  axios.get(api_endpoint+"/api/v1/bots", {
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

export const createBot = (api_endpoint, access_token, eth_address, values) => (dispatch) => {
  console.log("Making API request to create a Bot",api_endpoint);
  axios.post(api_endpoint+"/api/v1/bots",
  {
      bot: values,
      access_token: access_token,
      eth_address: eth_address
  })
  .then(function(response) {
    browserHistory.push('/bots')
  })
  .catch(function(error) {
    dispatch(setErrors([error.message]));
  });
}
