import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developer from './developer'
import bots from './bots'
import search from './search'
import txObserver from './txObserver'


const reducer = combineReducers({
  form,
  search,
  developer,
  txObserver
})

export default reducer
