import Web3 from 'web3'
import artifact from './abi/DeveloperRegistryDelegate.json'

class DeveloperRegistry {
  constructor() {
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(artifact.abi, DEVELOPER_REGISTRY_CONTRACT);
  }

  getActiveAccount() {
    return this.web3.eth.getAccounts().then( (accounts) => {
      return Promise.resolve(accounts[0]);
    });
  }

 /**
  * @param {string} url
  * @param {string} metadata
  * @returns {Promise}
  */
  addDeveloper(url, metadata) {
    let metadataHash = this.web3.utils.sha3(metadata); // bytes32
    let urlBytes = this.web3.utils.utf8ToHex(url.substring(0,31)); // bytes32
    let contract = this.contract;
    console.log("url: ", urlBytes );
    console.log("data:", metadataHash );
    return this.web3.eth.getAccounts().then( (accounts) => {
      return new Promise(function(resolve,reject) {
        contract.methods.addDeveloper(metadataHash, urlBytes)
          .send({from: accounts[0]},
            function(err,tx_id) {
              if( err ) {
                console.log("addDeveloper error:",err);
                reject( err );
              }else {
                console.log("addDeveloper tx_id:",tx_id);
                resolve(tx_id);
              }
            });

      });
    });
  }
}

export default DeveloperRegistry;
