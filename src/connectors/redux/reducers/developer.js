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
  developerApproval: false,
  errors: []
}

const developer = (state = initialState, action) => {
  switch (action.type) {
    case DeveloperActions.RESET_STATE:
      let new_state = {...initialState, ...{entryPrice: state.entryPrice, developerId: state.developerId, developerApproval: state.developerApproval}}
      return update(state, {$set: new_state});
    case DeveloperActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default developer;
