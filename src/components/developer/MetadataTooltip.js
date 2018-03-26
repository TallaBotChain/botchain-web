import React, { Component } from 'react';
import Tooltip from '../form/Tooltip';
import { Link } from 'react-static'

class MetadataTooltip extends Component {

  render() {
    return (
      <Tooltip {...this.props} >
        Read our FAQs to learn more about hosting your own Developer Metadata.
        <Link to="/faq" className='button'>Learn more</Link>
      </Tooltip>
    );
  }
}

export default MetadataTooltip;
