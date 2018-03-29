import artifact from './abi/BotServiceRegistryDelegate.json'
import BaseRegistry from './BaseRegistry'

class ServiceRegistry extends BaseRegistry {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(artifact.abi, SERVICE_REGISTRY_CONTRACT);
  }

  /**
   * @param {string} url
   * @param {string} metadata
   * @returns {Promise}
   */
  addService(developerId, ethAddress, url, metadata) {
    let metadataHash = this.web3.utils.sha3(metadata); // bytes32
    let urlBytes = this.web3.utils.utf8ToHex(url.substring(0,31)); // bytes32
    let contract = this.contract;
    console.log("service developerId: ", developerId);
    console.log("service ethAddress: ", ethAddress);
    console.log("service url: ", urlBytes );
    console.log("service metadata:", metadataHash );
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        contract.methods.createBotService(developerId,ethAddress,metadataHash, urlBytes)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( err ) {
                console.log("addService error:",err);
                reject( err );
              }else {
                console.log("addService tx_id:",tx_id);
                resolve(tx_id);
              }
            });

      });
    });
  }
}

export default ServiceRegistry;
