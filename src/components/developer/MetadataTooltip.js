import React, { Component } from 'react';
import Tooltip from '../form/Tooltip';
import { Link } from 'react-static'

class MetadataTooltip extends Component {

  render() {
    return (
      <Tooltip {...this.props} >
        Read our FAQs to learn more about hosting your own Developer Metadata.
        <a href="/faq#question_7" target="_blank" className='button'>Learn more</a>
      </Tooltip>
    );
  }
}

export default MetadataTooltip;
