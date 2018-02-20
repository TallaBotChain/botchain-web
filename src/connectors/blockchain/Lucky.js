import Web3 from 'web3'
import artifact from './LuckyCoin.json'

class Lucky {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, "0xa166bbb72d3da1119511a8bdbdff1c49560df094");
  }

  pay(amount) {
    let self = this;
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        self.contract.methods.transfer("0xCED373380A875AC7650EA0aC78CBDCF62Da7f9A2",50*10**15)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( err ) {
                console.log("Transfer error:",err);
                reject( err );
              }else {
                console.log("transfer tx_id:",tx_id);
                resolve(tx_id);
              }
            });

      });
    });
  }

}

export default Lucky;
