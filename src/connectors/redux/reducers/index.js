import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developerRecord from './developerRecord'
import bots from './bots'
import search from './search'
import txObserver from './txObserver'


const reducer = combineReducers({
  form,
  search,
  txObserver
})

export default reducer
