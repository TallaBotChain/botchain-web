import { BotActions } from '../actions/botActions.js'

import update from 'immutability-helper';

const initialState = {
  inProgress: false,
  allowanceTxId: null,
  addBotTxId: null,
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
