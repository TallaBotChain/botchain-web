import Web3 from 'web3'
import artifact from './abi/BotInstanceRegistryDelegate.json'

class InstanceRegistry {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, SERVICE_REGISTRY_CONTRACT);
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
  addInstance(botId, ethAddress, url, metadata) {
    let metadataHash = this.web3.utils.sha3(metadata); // bytes32
    let urlBytes = this.web3.utils.utf8ToHex(url.substring(0,31)); // bytes32
    let contract = this.contract;
    console.log("instance botId: ", botId);
    console.log("instance ethAddress: ", ethAddress);
    console.log("instance url: ", urlBytes );
    console.log("instance metadata:", metadataHash );
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        contract.methods.createBotInstance(botId,ethAddress,metadataHash, urlBytes)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( err ) {
                console.log("createBotInstance error:",err);
                reject( err );
              }else {
                console.log("createBotInstance tx_id:",tx_id);
                resolve(tx_id);
              }
            });

      });
    });
  }
}

export default InstanceRegistry;
