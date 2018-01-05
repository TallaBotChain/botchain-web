import { botActions } from '../actions/botActions.js'
import update from 'immutability-helper';

const normalizeBots = (bots) => {
  let result = { byHash: {}, allIds: []}
  bots.map((bot) => {
    result.allIds.push(bot.hashed_identifier)
    result.byHash[bot.hashed_identifier] = bot
  })
  return result
}

const initialState = {
  isFetching: false,
  allIds: [],
  byHash: {},
  errors: []
}

const bots = (state = initialState, action) => {
  switch (action.type) {
  case botActions.SET_ERRORS:
  case botActions.SET_IS_FETCHING:
      return update(state, {[action.key]: {$set: action.value}});
  case botActions.SET_BOTS:
      let b = normalizeBots(action.bots)
      return update(state, {byHash: {$set: b.byHash}, allIds: {$set: b.allIds}});
  default:
    return state
  }
}

export default bots;
