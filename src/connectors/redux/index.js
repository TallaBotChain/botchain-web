import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducers'

if (typeof window === 'undefined') {
  global.window = {}
}

const middlewares = [];
middlewares.push(thunk);
if( CONSOLE_ENABLED ) middlewares.push( createLogger() );

const store = createStore(
  reducer,
  {}, // initial state
  applyMiddleware(...middlewares)
)

export default store
