import DeveloperRegistry from '../../blockchain/DeveloperRegistry';
import BotCoin from '../../blockchain/BotCoin';

let accountObserverTimer = null;

export const MetamaskActions = {
  SET_ATTRIBUTE: "METAMASK_SET_ATTRIBUTE"
}

export const connectToMetamask = () => (dispatch) => {
  dispatch( fetchNetwork() );
  dispatch( fetchAccount() );
  dispatch( getTokenBalance() );
  dispatch( startAccountObserver() );
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

const getTokenBalance = () => async (dispatch) => {
  let botcoin = new BotCoin();
  let balance = await botcoin.getTokenBalance();
  console.log(balance)
  dispatch( { type: MetamaskActions.SET_ATTRIBUTE, key: 'token_balance', value: (parseInt(balance)/10**18) });
}

const startAccountObserver = () => (dispatch) => {
  clearInterval(accountObserverTimer);
  accountObserverTimer = setInterval(() => dispatch(accountObserverTick()), 2000);
}

const accountObserverTick = () => async (dispatch, getState) => {
  const metamask = getState().metamask;
  let registry = new DeveloperRegistry();
  let account = await registry.getActiveAccount();
  if (metamask.eth_address !== account) {
    return location.reload()
  }
}
