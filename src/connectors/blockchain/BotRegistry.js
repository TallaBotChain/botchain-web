import Web3 from 'web3'
import artifact from './abi/BotProductRegistryDelegate.json'

class BotRegistry {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, BOT_REGISTRY_CONTRACT);
  }

  getActiveAccount() {
    return this.web3.eth.getAccounts().then( (accounts) => {
      return Promise.resolve(accounts[0]);
    });
  }

  getCurrentNetwork() {
    return this.web3.eth.net.getId().then( netId => {
      return Promise.resolve(netId);
    })
  }

  getEntryPrice() {
    let contract = this.contract;
    return this.web3.eth.getAccounts().then( (accounts) => {
      return contract.methods.entryPrice().call({from: accounts[0]});
    });
  }

  /**
   * @param {string} url
   * @param {string} metadata
   * @returns {Promise}
   */
  addBot(developerId, ethAddress, url, metadata) {
    let metadataHash = this.web3.utils.sha3(metadata); // bytes32
    let urlBytes = this.web3.utils.utf8ToHex(url.substring(0,31)); // bytes32
    let contract = this.contract;
    console.log("developerId: ", developerId);
    console.log("ethAddress: ", ethAddress);
    console.log("url: ", urlBytes );
    console.log("data:", metadataHash );
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        contract.methods.createBotProduct(developerId,ethAddress,metadataHash, urlBytes)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( err ) {
                console.log("addBot error:",err);
                reject( err );
              }else {
                console.log("addBot tx_id:",tx_id);
                resolve(tx_id);
              }
            });

      });
    });
  }
}

export default BotRegistry;
