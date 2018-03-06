const configs = {
  development: {
    title: '[DEV] BotChain',
    api_endpoint: 'http://localhost:3001',
    botchain_contract: "0x8b2c764339b269828eb2548ae1a821244bd0e232",
    botcoin_contract: "0xD29b42f0d8E1eb49D74CE7Ae63137A0ff034a563",
    etherscan_url: "https://kovan.etherscan.io"
  },
  demo: {
    title: '[TESTNET] BotChain',
    api_endpoint: 'https://botchain-api.botchain.talla.io',
    botcoin_contract: "0x0",
    botchain_contract: "0x9bbe731aef56ece5bd62b4da84e500bbc7507348",
    etherscan_url: "https://kovan.etherscan.io"
  },
  production: { // the same with demo right now
    title: 'BotChain',
    api_endpoint: 'https://botchain-api.botchain.talla.io',
    botcoin_contract: "0x0",
    botchain_contract:  "0x9bbe731aef56ece5bd62b4da84e500bbc7507348",
    etherscan_url: "https://kovan.etherscan.io"
  }
}

export default (dev) => {
  let enviroment = ( dev ? 'development' : 'production' );
  if( process.env['ENV'] !== undefined ) {
    enviroment = process.env['ENV'];
  }
  return configs[ enviroment.toLowerCase() ];
}
