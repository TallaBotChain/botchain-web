import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developerRecord from './developerRecord'
import bots from './bots'
import search from './search'


const reducer = combineReducers({
  form,
  search
})

export default reducer
