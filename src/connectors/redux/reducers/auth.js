import { authorizeUserActions } from '../actions/authorizeUser.js'

import update from 'immutability-helper';

const initialState = {
  eth_address: null,
  access_token: null,
  errors: []
}

const auth = (state = initialState, action) => {
  switch (action.type) {
  case authorizeUserActions.SET_ERRORS:
  case authorizeUserActions.SET_ACCESS_TOKEN:
  case authorizeUserActions.SET_ETH_ADDRESS:
      return update(state, {[action.key]: {$set: action.value}});
  default:
    return state
  }
}

export default auth;
