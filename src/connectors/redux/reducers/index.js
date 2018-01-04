import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import developerRecord from './developerRecord'
import auth from './auth'


const reducer = combineReducers({
  form,
  auth,
  developerRecord
})

export default reducer
