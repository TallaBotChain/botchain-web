import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developerRecord from './developerRecord'
import auth from './auth'
import bots from './bots'


const reducer = combineReducers({
  form,
  auth,
  bots,
  developerRecord
})

export default reducer
