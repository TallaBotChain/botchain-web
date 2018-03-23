import { DeveloperActions } from '../actions/developerActions.js'

import update from 'immutability-helper';

const initialState = {
  entryPrice: null,
  inProgress: false,
  allowanceTxId: null,
  allowanceTxMined: false,
  addDeveloperTxId: null,
  addDeveloperTxMined: false,
  successfullyAdded: false,
  developerId: 0,
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
