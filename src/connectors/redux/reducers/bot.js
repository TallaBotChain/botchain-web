import { BotActions } from '../actions/botActions.js'

import update from 'immutability-helper';

const initialState = {
  entryPrice: null,
  allowanceTxId: null,
  allowanceTxMined: false,
  addDeveloperTxId: null,
  addDeveloperTxMined: false,
  successfullyAdded: false,
  developerId: 0,
  developerApproval: false,
  errors: []
}

const bot = (state = initialState, action) => {
  switch (action.type) {
    case BotActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default bot;
