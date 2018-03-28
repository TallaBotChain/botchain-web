import { BotActions } from '../actions/botActions.js'

import update from 'immutability-helper';

const initialState = {
  entryPrice: null,
  allowanceTxId: null,
  allowanceTxMined: false,
  addBotTxId: null,
  addBotTxMined: false,
  successfullyAdded: false,
  errors: []
}

const bot = (state = initialState, action) => {
  switch (action.type) {
    case BotActions.RESET_STATE:
      return update(state, {$set: initialState});
    case BotActions.SET_ATTRIBUTE:
      return update(state, {[action.key]: {$set: action.value}});
    default:
      return state
  }
}

export default bot;
