import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developer from './developer'
import bot from './bot'
import search from './search'
import service from './service'
import instance from './instance'
import metamask from './metamask'
import txObserver from './txObserver'


const reducer = combineReducers({
  bot,
  form,
  search,
  metamask,
  developer,
  txObserver,
  service,
  instance
})

export default reducer
