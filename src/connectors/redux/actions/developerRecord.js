import axios from 'axios'
import Web3 from 'web3'

export const DeveloperRecordActions = {
  FETCH_RECORD: 'FETCH_RECORD',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_WAS_FOUND: 'SET_WAS_FOUND',
  SET_RECORD: 'SET_RECORD',
  SET_ERRORS: 'SET_ERRORS'
}

export const setIsFetching = (isFetching)  => {
  return { type: DeveloperRecordActions.SET_IS_FETCHING, key: 'isFetching', value: isFetching }
}

export const setWasFound = (wasFound)  => {
  return { type: DeveloperRecordActions.SET_WAS_FOUND, key: 'wasFound', value: wasFound }
}

export const setErrors = (errors)  => {
  return { type: DeveloperRecordActions.SET_ERRORS, key: 'errors', value: errors }
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
    dispatch(setWasFound(true))
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
    let record = {...values, hashed_identifier: response.data.hashed_identifier}
    dispatch(setDevRecord(record))
  })
  .catch(function(error) {
    dispatch(setErrors([error.message]));
  });
}
