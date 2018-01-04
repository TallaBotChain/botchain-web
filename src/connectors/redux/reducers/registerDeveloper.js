import { RegisterDeveloperActions } from '../actions/registerDeveloper.js'

import update from 'immutability-helper';

const initialState = {
  payload: null,
  access_token: null,
  errors: []
}

const registerDeveloper = (state = initialState, action) => {
  switch (action.type) {
  case RegisterDeveloperActions.SET_ERRORS:
  case RegisterDeveloperActions.SET_ACCESS_TOKEN:
      return update(state, {[action.key]: {$set: action.value}});
  default:
    return state
  }
}

export default registerDeveloper;
