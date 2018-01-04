import React from 'react'

class Errors extends React.Component {

  render() {
    var errorMessages = Array.isArray(this.props.errors) ? this.props.errors : (this.props.errors ? [this.props.errors] : []);
    return <div className={errorMessages.length > 0 ? 'alert' : 'hidden'} >
      <ul>
      {errorMessages.map(function(message,index){
            return <li key={index}>{message}</li>;
            })}
      </ul>
    </div>
    }
}

export default Errors;
