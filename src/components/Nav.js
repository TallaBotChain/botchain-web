import React from 'react'
import {connect} from 'react-redux'
import { getSiteProps } from 'react-static';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends React.Component {

  render() {

    return (
      <nav>
        <strong>Botchain</strong>
        <div style={{float: 'right'}}>
          {this.props.auth.access_token != null && this.props.developerRecord.eth_address != null &&(
            <NavLink to="/developer">Developer</NavLink>
          )}
          {this.props.auth.access_token != null && this.props.developerRecord.approved &&(
            <NavLink to="/bots">Bots</NavLink>
          )}
        </div>
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
