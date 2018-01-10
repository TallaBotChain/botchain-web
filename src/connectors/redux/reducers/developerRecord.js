import { DeveloperRecordActions } from '../actions/developerRecord.js'

import update from 'immutability-helper';

const initialState = {
  isFetching: false,
  name: null,
  description: null,
  street_1: null,
  street_2: null,
  city: null,
  state: null,
  postal_code: null,
  country: null,
  phone: null,
  email: null,
  approved: null,
  eth_address: null,
  hashed_identifier: null,
  transaction_address: null,
  approved: false,
  errors: []
}

const developerRecord = (state = initialState, action) => {
  switch (action.type) {
    case DeveloperRecordActions.SET_ERRORS:
    case DeveloperRecordActions.SET_IS_FETCHING:
    case DeveloperRecordActions.SET_APPROVED:
      return update(state, {[action.key]: {$set: action.value}});
    case DeveloperRecordActions.SET_RECORD:
      return update(state, {$merge: action.values});
    default:
      return state
  }
}

export default developerRecord;
