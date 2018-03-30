import BotRegistry from '../blockchain/BotRegistry';

export class BotAddressValidator {

  static validate(address, props){
    let registry = new BotRegistry();
    return new Promise((resolve, reject) => {
      registry.botEntryIdForAddress(address).then((botId) => {
          console.log("Found botId ", botId);
          if( botId > 0 ) {
            resolve();
          }else {
            reject({ bot_address : 'Bot with address '+address+' is not registered.' });
          }
      }).catch((error) => {
        reject({ bot_address: 'Failed to validate bot address'});
      });
    });
  }
}

export default BotAddressValidator;
