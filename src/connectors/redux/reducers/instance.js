import { InstanceActions } from '../actions/instanceActions.js'

import update from 'immutability-helper';

const initialState = {
  entryPrice: null,
  allowanceTxId: null,
  allowanceTxMined: false,
  addInstanceTxId: null,
  addInstanceTxMined: false,
  successfullyAdded: false,
  errors: []
}

const instance = (state = initialState, action) => {
  switch (action.type) {
    case InstanceActions.RESET_STATE:
      let new_state = {...initialState, ...{entryPrice: state.entryPrice}}
      return update(state, {$set: new_state});
    case InstanceActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default instance;
