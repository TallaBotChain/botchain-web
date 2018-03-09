import Web3 from 'web3'
import artifact from './abi/BotCoin.json'

class BotCoin {
  constructor(address) {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, address);
    this.decimals = 18;
    console.log("New instance of BotCoin connector with address ", address);
  }

  pay(amount,to) {
    let self = this;
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        self.contract.methods.transfer(to,amount*10**self.decimals)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( ! err ) {
                console.log("transfer tx_id:",tx_id);
                resolve(tx_id);
              }
            }).catch( (err) => {
              reject(err);
            });

      });
    });
  }

  isTxMined(tx_id){
    return this.web3.eth.getTransaction(tx_id).then( (transaction) => {
      console.log(transaction)
      return transaction.blockNumber != null ? true : false
    }).catch(error => {
      return false
    });
  }

  isTxSucceed(tx_id){
    return this.web3.eth.getTransactionReceipt(tx_id).then( (receipt) => {
      console.log(receipt)
      return receipt.status == 1 ? true : false
    }).catch(error => {
      return false
    });
  }

}

export default BotCoin;
