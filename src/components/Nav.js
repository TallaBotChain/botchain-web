import React from 'react'
import {connect} from 'react-redux'
import { getSiteProps } from 'react-static';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends React.Component {

  render() {
    let links = null
    if (this.props.auth.access_token && this.props.developerRecord.hashed_identifier) {
      links = (
        <div style={{float: 'right'}}>
          <NavLink to="/developer">Developer</NavLink>
          <NavLink to="/bots">Bots</NavLink>
        </div>
      )
    }
    return (
      <nav>
        <strong>Botchain</strong>
        {links}
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
