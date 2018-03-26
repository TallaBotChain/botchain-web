import { MetamaskActions } from '../actions/metamaskActions.js'

import update from 'immutability-helper';

const initialState = {
  eth_address: null,
  network_id: null,
  token_balance: 0,
  errors: []
}

const metamask = (state = initialState, action) => {
  switch (action.type) {
    case MetamaskActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default metamask;
