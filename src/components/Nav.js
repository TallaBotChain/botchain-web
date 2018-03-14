import React from 'react'
import {connect} from 'react-redux'
import { getSiteProps } from 'react-static';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends React.Component {

  render() {

    return (
      <nav>
        <strong className="logo">BotChain</strong>
        <NavLink to="/developer">Developer</NavLink>
        <NavLink to="/bots">Bots</NavLink>
        <NavLink exact to="/">Services</NavLink>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    developerRecord: state.developerRecord,
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(getSiteProps(Nav)))
