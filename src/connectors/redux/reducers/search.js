import { searchActions } from '../actions/searchActions';
import update from 'immutability-helper';

const initialState = {
  query: '',
  tx_id: null,
  txMined: false,
  txSucceed: false,
  isFetching: false,
  bots: [],
  errors: []
}

const search = ( state = initialState, action ) => {
  switch(action.type) {
    case searchActions.SET_ERRORS:
    case searchActions.SET_TX_ID:
    case searchActions.SET_BOTS:
    case searchActions.SET_ATTRIBUTE:
      return update( state, {[action.key]: {$set: action.value}});
    default:
      return state;
  }
}

export default search;
