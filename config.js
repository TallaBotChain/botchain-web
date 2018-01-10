const configs = {
  development: {
    title: '[DEV] Botchain ',
    api_endpoint: 'http://localhost:3001',
    botchain_contract: "0xaf8153cdc92563dc18aee3470e3dc53da0560830",
    etherscan_url: "https://kovan.etherscan.io"
  },
  demo: {
    title: '[TESTNET] Botchain ',
    api_endpoint: 'https://botchain-api.botchain.talla.io',
    botchain_contract: "0xaf8153cdc92563dc18aee3470e3dc53da0560830",
    etherscan_url: "https://kovan.etherscan.io"
  },
  production: { // the same with demo right now
    title: 'Botchain',
    api_endpoint: 'https://botchain-api.botchain.talla.io',
    botchain_contract: "0xaf8153cdc92563dc18aee3470e3dc53da0560830",
    etherscan_url: "https://etherscan.io"
  }
}

export default (dev) => {
  let enviroment = ( dev ? 'development' : 'production' );
  if( process.env['ENV'] !== undefined ) {
    enviroment = process.env['ENV'];
  }
  return configs[ enviroment.toLowerCase() ];
}
