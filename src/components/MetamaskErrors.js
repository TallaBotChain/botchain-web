import React from 'react'
import { Link } from 'react-static';

class MetamaskErrors extends React.Component {

  render() {
    let error = null
    if(this.props.metamask.eth_address == null){
      error = (<p className='alert-info'>Please ensure MetaMask is unlocked and set to the Kovan test network. Read our <Link to="/faq">FAQs</Link> to learn more about Metamask.</p>)
    }else if(this.props.metamask.network_id != ETHEREUM_NETWORK_ID){
      error = (<p className='alert-info'>Please ensure MetaMask is set to the Kovan test network.</p>)
    }

    return (
      <div>{error}</div>
    )
  }
}

export default MetamaskErrors;
