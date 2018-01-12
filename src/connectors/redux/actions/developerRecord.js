import axios from 'axios'
import Web3 from 'web3'
import Botchain from '../../blockchain/Botchain'

let timer = null;

export const DeveloperRecordActions = {
  FETCH_RECORD: 'FETCH_RECORD',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_WAS_FOUND: 'SET_WAS_FOUND',
  SET_RECORD: 'SET_RECORD',
  SET_ERRORS: 'SET_ERRORS',
  SET_APPROVED: 'SET_ERRORS',
  TX_CHECKS_STARTED: 'TX_CHECKS_STARTED',
  TX_CHECKS_STOPPED: 'TX_CHECKS_STOPPED',
  TX_CHECK: 'TX_CHECK'
}

export const setIsFetching = (isFetching)  => {
  return { type: DeveloperRecordActions.SET_IS_FETCHING, key: 'isFetching', value: isFetching }
}

export const setErrors = (errors)  => {
  return { type: DeveloperRecordActions.SET_ERRORS, key: 'errors', value: errors }
}

export const setApproved = (approved)  => {
  return { type: DeveloperRecordActions.SET_APPROVED, key: 'approved', value: approved }
}

const setDevRecord = (record)  => {
  return { type: DeveloperRecordActions.SET_RECORD, values: record }
}

export const fetchDeveloperRecord = (api_endpoint, eth_address) => (dispatch) => {
  dispatch(setIsFetching(true))
  console.log("Making API request to get Developer Record", api_endpoint);
  axios.get(api_endpoint+"/v1/developer_records", {
    params: {
      eth_address: eth_address
    }
  })
  .then(function(response) {
    dispatch(setDevRecord(response.data))
    dispatch(setIsFetching(false))
    dispatch(getTransactionDetails(api_endpoint, eth_address))
  })
  .catch(function(error) {
    //skip 404 error
    if (error.response.status != 404) {
        dispatch(setErrors([error.message]));
    }
    dispatch(setIsFetching(false))
  });
}

export const getTransactionDetails = (api_endpoint, eth_address) => (dispatch) => {
  dispatch(setIsFetching(true))
  console.log("Making API request to get Developer Record Transaction", api_endpoint);
  axios.get(api_endpoint+"/v1/developer_records/eth_transaction", {
    params: {
      eth_address: eth_address,
      action_name: "addDeveloper"
    }
  })
  .then(function(response) {
    dispatch(setDevRecord(response.data))
    dispatch(setIsFetching(false))
    dispatch(startTransactionChecks(response.data.transaction_address))
  })
  .catch(function(error) {
    //skip 404 error
    if (error.response.status != 404) {
        dispatch(setErrors([error.message]));
    }
    dispatch(setIsFetching(false))
  });
}


export const createDeveloperRecord = (api_endpoint, access_token, values) => (dispatch) => {
  console.log("Making API request to create Dev Record",api_endpoint);
  axios.post(api_endpoint+"/v1/developer_records",
  {
      developer_record: values,
      access_token: access_token
  })
  .then(function(response) {
    let record = {...values,
      hashed_identifier: response.data.hashed_identifier,
      transaction_address: response.data.transaction_address
    }
    dispatch(setDevRecord(record))
    dispatch(startTransactionChecks(response.data.transaction_address))
  })
  .catch(function(error) {
    dispatch(setErrors([error.message]));
  });
}

export const checkTransactionStatus = (tx_id) => (dispatch) => {
  dispatch({ type: DeveloperRecordActions.TX_CHECK })
  let botchain = new Botchain();
  if (botchain.isTxMined(tx_id)) {
    if (botchain.isTxSucceed(tx_id)) {
      dispatch(setApproved(true))
    }else{
      dispatch(setApproved(false))
    }
    dispatch(stopTransactionChecks())
  }
}

export const startTransactionChecks = (tx_id) => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(checkTransactionStatus(tx_id)), 5000);
  dispatch({ type: DeveloperRecordActions.TX_CHECKS_STARTED })
}

export const stopTransactionChecks = () => (dispatch) => {
  clearInterval(timer);
  dispatch({ type: DeveloperRecordActions.TX_CHECKS_STOPPED })
}
