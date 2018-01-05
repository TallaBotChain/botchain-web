import React from 'react'
import { Router, Link } from 'react-static'
//
import Routes from 'react-static-routes'
//
import { Provider } from 'react-redux'
import store from './connectors/redux'
import Nav from './components/Nav'

import './app.css'

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <Nav/>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  </Provider>
)
