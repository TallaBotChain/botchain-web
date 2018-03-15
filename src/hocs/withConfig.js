import React, { Component } from 'react';

function withConfig(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props);
      window.config = this.props.config;
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}

export default withConfig;
