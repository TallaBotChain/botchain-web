import Web3 from 'web3'
import artifact from './botchainArtifact.json'

class Botchain {
  constructor(address) {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, address);
  }

  createBot(botAddress, values) {
    let string = JSON.stringify(values);
    let sha = this.web3.utils.sha3(string);
    console.log("Hash:", sha);
    console.log("Bot Address:", botAddress);
    return this.web3.eth.getAccounts().then( (accounts) => {
      return this.contract.methods.createBot(botAddress, sha).send({from: accounts[0]});
    });
  }

  isTxMined(tx_id){
    return this.web3.eth.getTransaction(tx_id).then( (transaction) => {
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

export default Botchain;
