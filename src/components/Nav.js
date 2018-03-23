import React from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-static'

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
          </ul>
        </div>
        <a href="/">Services</a>
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
