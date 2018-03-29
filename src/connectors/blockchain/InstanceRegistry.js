import artifact from './abi/BotInstanceRegistryDelegate.json'
import BaseRegistry from './BaseRegistry'

class InstanceRegistry extends BaseRegistry {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(artifact.abi, INSTANCE_REGISTRY_CONTRACT);
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
