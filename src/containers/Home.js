import React from 'react'
import { getSiteProps } from 'react-static'

import Web3 from 'web3';


const w3 = () => {
  var localWeb3 = new Web3(window.web3.currentProvider)
  localWeb3.eth.getAccounts().then( (accounts) => {
    var data = toHex("dm.salko@gmail.com");
    localWeb3.currentProvider.sendAsync({ id: 1, method: 'personal_sign', params: [accounts[0], data] },
      function(err,result) {
        console.log(err);
        console.log(result);
      });
  });
}

function toHex(s) {
  var hex = '';
  for(var i=0;i<s.length;i++) { hex += ''+s.charCodeAt(i).toString(16); }
  return "0x"+hex;
}


export default getSiteProps(() => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Developer registration</h1>
    <button onClick={w3}>Click me</button>
  </div>
))
