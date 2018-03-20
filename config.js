import webpack from 'webpack'

const configs = {
  development: {
    SITE_TITLE: JSON.stringify('[DEV] BotChain'),
    API_ENDPOINT: JSON.stringify('http://localhost:3001'),
    BOTCHAIN_CONTRACT: JSON.stringify("0x8b2c764339b269828eb2548ae1a821244bd0e232"),
    BOTCOIN_CONTRACT: JSON.stringify("0xD29b42f0d8E1eb49D74CE7Ae63137A0ff034a563"),
    DEVELOPER_REGISTRY_CONTRACT: JSON.stringify("0x8b2c764339b269828eb2548ae1a821244bd0e232"),
    ETHERSCAN_URL: JSON.stringify("https://kovan.etherscan.io"),
    URLSHORTENER_API_KEY: JSON.stringify("AIzaSyDS1dYnvSQPmC3Bwh5G62nrwFBD1pmveLM"),
    ETHEREUM_NETWORK_ID: JSON.stringify(42)
  },
  production: {
    SITE_TITLE: JSON.stringify('BotChain'),
    API_ENDPOINT: JSON.stringify('https://botchain-api.botchain.talla.io'),
    BOTCOIN_CONTRACT: JSON.stringify("0x0"),
    BOTCHAIN_CONTRACT:  JSON.stringify("0x9bbe731aef56ece5bd62b4da84e500bbc7507348"),
    DEVELOPER_REGISTRY_CONTRACT: JSON.stringify("0x8b2c764339b269828eb2548ae1a821244bd0e232"),
    ETHERSCAN_URL: JSON.stringify("https://production.etherscan.io"),
    URLSHORTENER_API_KEY: JSON.stringify("AIzaSyDS1dYnvSQPmC3Bwh5G62nrwFBD1pmveLM"),
    ETHEREUM_NETWORK_ID: JSON.stringify(42)
  }
}

const Config = new webpack.DefinePlugin(configs[process.env.REACT_STATIC_ENV])
export default Config
