import React from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends React.Component {

  render() {

    return (
      <nav>
        <strong className="logo">Botchain</strong>
        <div className='menu-item'>Developer <b>&#8964;</b>
          <ul className="submenu">
            <li>
              <NavLink to="/developer">Register</NavLink>
            </li>
          </ul>
        </div>
        <div className='menu-item'>Bots <b> &#8964;</b>
          <ul className="submenu">
            <li>
              <NavLink to="/add_bot">Add bot</NavLink>
            </li>
            <li>
              <NavLink to="/add_instance">Add bot instance</NavLink>
            </li>
          </ul>
        </div>
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

export default withRouter(connect(mapStateToProps)(Nav))
