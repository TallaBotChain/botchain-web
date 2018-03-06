import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developerRecord from './developerRecord'
import bots from './bots'


const reducer = combineReducers({
  form,
  bots,
  developerRecord
})

export default reducer
