import DeveloperRegistry from '../../blockchain/DeveloperRegistry';

export const MetamaskActions = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE"
}

export const connectToMetamask = () => (dispatch) => {
  dispatch( fetchNetwork() );
  dispatch( fetchAccount() );
}

const fetchAccount = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  dispatch( { type: MetamaskActions.SET_ATTRIBUTE, key: 'eth_address', value: account });
}

const fetchNetwork = () => async (dispatch) => {
  let registry = new DeveloperRegistry();
  let id = await registry.getCurrentNetwork();
  dispatch( { type: MetamaskActions.SET_ATTRIBUTE, key: 'network_id', value: id });
}
