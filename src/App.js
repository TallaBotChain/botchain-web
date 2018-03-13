import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-static'
//
import Routes from 'react-static-routes'
//
import { Provider } from 'react-redux'
import store from './connectors/redux'
import Nav from './components/Nav'
import NoMetamaskPage from './containers/NoMetamask'
import SearchPage from './containers/Search'
import DeveloperPage from './containers/Developer'

import './app.css'


const MetamaskRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props =>
      (typeof web3 !== 'undefined')  ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/no_metamask" }} />
      )
    }
  />
);



export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <Nav/>
        <div className="content">
          <Switch>
          <MetamaskRoute exact path='/' component={SearchPage} />
          <MetamaskRoute path='/developer' component={DeveloperPage} />
          <Routes />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
)
