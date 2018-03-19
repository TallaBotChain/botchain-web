import React, { Component }  from 'react';

class Tooltip extends Component {
  render() {
    return (
      <div className='tooltip'>
        <div>
          <div className='popup'>
            {this.props.children}
          </div>
        </div>
      </div>
      )
  }
}

export default Tooltip;

