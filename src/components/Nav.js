import React from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-static'

class Nav extends React.Component {

  render() {

    return (
      <nav>
        <a href='/' className="logo">Botchain</a>
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
              <NavLink to="/add_bot_instance">Add bot instance</NavLink>
            </li>
          </ul>
        </div>
        <div className='menu-item'>Services <b> &#8964;</b>
          <ul className="submenu">
            <li>
              <NavLink to="/">Search</NavLink>
            </li>
            <li>
              <NavLink to="/add_service">Add service</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/faq">FAQ</NavLink>
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
