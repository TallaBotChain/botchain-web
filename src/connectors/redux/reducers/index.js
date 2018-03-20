import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developer from './developer'
import bot from './bot'
import search from './search'
import metamask from './metamask'
import txObserver from './txObserver'


const reducer = combineReducers({
  bot,
  form,
  search,
  metamask,
  developer,
  txObserver
})

export default reducer
