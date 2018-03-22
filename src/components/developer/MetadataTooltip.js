import React, { Component } from 'react';
import Tooltip from '../form/Tooltip';

class MetadataTooltip extends Component {

  render() {
    return (
      <Tooltip {...this.props} >
        Read our FAQs to learn more about hosting your own Developer Metadata.
        <a className='button' href='#'>Learn more</a>
      </Tooltip>
    );
  }
}

export default MetadataTooltip;
