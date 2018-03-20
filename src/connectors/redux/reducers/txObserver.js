import { txObserverActions } from '../actions/txObserverActions';
import update from 'immutability-helper';

const initialState = {
  transactions: {}
}

const txObserver = ( state = initialState, action ) => {
  switch(action.type) {
    case txObserverActions.ADD_TX:
      return update( state, {transactions: {[action.tx_id]: {$set: action.value}}});
    case txObserverActions.UPDATE_TX:
      return update( state, {transactions: {[action.tx_id]: {[action.key]: {$set: action.value}}}});
    default:
      return state;
  }
}

export default txObserver;
