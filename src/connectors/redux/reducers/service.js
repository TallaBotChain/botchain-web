import { ServiceActions } from '../actions/serviceActions.js'

import update from 'immutability-helper';

const initialState = {
  entryPrice: null,
  allowanceTxId: null,
  allowanceTxMined: false,
  addServiceTxId: null,
  addServiceTxMined: false,
  successfullyAdded: false,
  errors: []
}

const service = (state = initialState, action) => {
  switch (action.type) {
    case ServiceActions.RESET_STATE:
      return update(state, {$set: initialState});
    case ServiceActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default service;
