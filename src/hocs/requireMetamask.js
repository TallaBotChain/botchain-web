import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-static'

function requireMetamask(WrappedComponent) {
  return withRouter(
    class WM extends React.Component {

      componentDidMount() {
        if(!this.isMetamaskInstalled()){
          this.props.history.push("/no_metamask")
        }
      }

      isMetamaskInstalled() {
        return typeof web3 !== 'undefined'
      }

      render() {
        return ( <WrappedComponent {...this.props}/>)
      }
    }
  )
}

export default requireMetamask;
