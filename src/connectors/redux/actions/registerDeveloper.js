import axios from 'axios'
import Web3 from 'web3'

function toHex(s) {
  var hex = '';
  for(var i=0;i<s.length;i++) { hex += ''+s.charCodeAt(i).toString(16); }
  return "0x"+hex;
}

export const RegisterDeveloperActions = {
  REQUEST_ACCESS_TOKEN: 'REQUEST_ACCESS_TOKEN',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_ERRORS: 'SET_ERRORS'
}

export const setErrors = (errors)  => {
  return { type: RegisterDeveloperActions.SET_ERRORS, key: 'errors', value: errors }
}

export const setAccessToken = (access_token)  => {
  return { type: RegisterDeveloperActions.SET_ACCESS_TOKEN, key: 'access_token', value: access_token }
}

export const requestAccessToken = (api_endpoint,values) => (dispatch) => {
  let localWeb3 = new Web3(window.web3.currentProvider);
  var self = this;
  localWeb3.eth.getAccounts().then( (accounts) => {
    var message = "botchain;"+values.email
    var data = toHex(message);
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
                eth_address: ethereumAccount,
                nonce: message
              }
            })
              .then(function(response) {
                console.log("api response",response);
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
