import { DeveloperActions } from '../actions/developerActions.js'

import update from 'immutability-helper';

const initialState = {
  inProgress: false,
  tx_id: null,
  allowanceTxId: null,
  addDeveloperTxId: null,
  errors: []
}

const developer = (state = initialState, action) => {
  switch (action.type) {
    case DeveloperActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default developer;
