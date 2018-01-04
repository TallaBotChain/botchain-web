import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import registerDeveloper from './registerDeveloper'


const reducer = combineReducers({
  form,
  registerDeveloper
})

export default reducer
