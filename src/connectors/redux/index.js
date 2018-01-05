import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducers'

if (typeof window === 'undefined') {
  global.window = {}
}

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  {}, // initial state
  applyMiddleware(thunk,loggerMiddleware)
)

export default store
