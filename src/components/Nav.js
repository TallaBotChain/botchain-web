import React from 'react'
import {connect} from 'react-redux'
import { getSiteProps } from 'react-static';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends React.Component {

  render() {

    return (
      <nav>
        <strong className="logo">Botchain</strong>
        <NavLink to="/developer">Developer <b>&#8964;</b>
          <ul className="submenu">
            <li>
              <NavLink to="/developer">Register</NavLink>
            </li>
          </ul>
        </NavLink>
        <NavLink to="/bots">Bots <b> &#8964;</b>
          <ul className="submenu">
            <li>
              <NavLink to="/add_bot">Add bot</NavLink>
            </li>
            <li>
              <NavLink to="/add_instance">Add bot instance</NavLink>
            </li>
          </ul>
        </NavLink>
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
