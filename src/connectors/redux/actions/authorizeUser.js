import axios from 'axios'
import Web3 from 'web3'

export const authorizeUserActions = {
  SET_ETH_ADDRESS: 'SET_ETH_ADDRESS',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_ERRORS: 'SET_ERRORS'
}

const setErrors = (errors)  => {
  return { type: authorizeUserActions.SET_ERRORS, key: 'errors', value: errors }
}

const setAccessToken = (access_token)  => {
  return { type: authorizeUserActions.SET_ACCESS_TOKEN, key: 'access_token', value: access_token }
}

const setEthAddress = (eth_address)  => {
  return { type: authorizeUserActions.SET_ETH_ADDRESS, key: 'eth_address', value: eth_address }
}

export const requestAccessToken = (api_endpoint,email) => (dispatch) => {
  let localWeb3 = new Web3(window.web3.currentProvider);
  var self = this;
  localWeb3.eth.getAccounts().then( (accounts) => {
    var message = "botchain;"+email
    var data = localWeb3.utils.utf8ToHex(message);
    var ethereumAccount = accounts[0];
    localWeb3.currentProvider.sendAsync({ id: 1, method: 'personal_sign', params: [ethereumAccount, data] },
      function(err,response) {
        if( ! err ) {
          var signature = response.result;
          console.log("signature:", signature);
          if( signature ) {
            console.log("Making API request to request Access Token",api_endpoint);
            axios.get(api_endpoint+"/v1/access_token", {
              params: {
                signature: signature,
                eth_address: ethereumAccount.toLowerCase(), // cause server-side recovers address in lowercase
                nonce: data // data is hex, message is text
              }
            })
              .then(function(response) {
                console.log(response)
                dispatch(setAccessToken(response.data.access_token))
                dispatch(setEthAddress(response.data.eth_address))
              })
              .catch(function(error) {
                dispatch(setErrors([error.message]));
              });
          } else {
            dispatch(setErrors("Request cancelled"));
          }
        } else {
          dispatch(setErrors(err.message));
        }
      });
  });
}
