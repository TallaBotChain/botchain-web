import webpack from 'webpack'

const configs = {
  development: {
    SITE_TITLE: JSON.stringify('[DEV] BotChain'),
    API_ENDPOINT: JSON.stringify('https://api.botchain.network'),
    BOTCOIN_CONTRACT: JSON.stringify("0x337bA7e4F7e86F429494D7196b7c122918f31f48"),
    DEVELOPER_REGISTRY_CONTRACT: JSON.stringify("0x877005c049a458294d3c063d2b5e48485c0900a9"),
    BOT_REGISTRY_CONTRACT: JSON.stringify("0x2b044c8a463bc52716d9818b56505c0ea1273f5a"),
    SERVICE_REGISTRY_CONTRACT: JSON.stringify("0x00be80cb8fe2c0df6462d4eaef2ecbf6dc28541a"),
    INSTANCE_REGISTRY_CONTRACT: JSON.stringify("0x4728e0a668df2aa10fcedf954228b775cdd45c21"),
    ETHERSCAN_URL: JSON.stringify("https://kovan.etherscan.io"),
    URLSHORTENER_API_KEY: JSON.stringify("AIzaSyDS1dYnvSQPmC3Bwh5G62nrwFBD1pmveLM"),
    ETHEREUM_NETWORK_ID: JSON.stringify(42),
    SEARCH_COLLECT_ADDRESS: JSON.stringify("0xffc028710c1c98fb43b0f836f26013ccbfcdcb7f"),
    SEARCH_PRICE: 1,
    CONSOLE_ENABLED: true
  },
  production: {
    SITE_TITLE: JSON.stringify('BotChain'),
    API_ENDPOINT: JSON.stringify('https://api.botchain.network'),
    BOTCOIN_CONTRACT: JSON.stringify("0x337bA7e4F7e86F429494D7196b7c122918f31f48"),
    DEVELOPER_REGISTRY_CONTRACT: JSON.stringify("0x877005c049a458294d3c063d2b5e48485c0900a9"),
    BOT_REGISTRY_CONTRACT: JSON.stringify("0x2b044c8a463bc52716d9818b56505c0ea1273f5a"),
    SERVICE_REGISTRY_CONTRACT: JSON.stringify("0x00be80cb8fe2c0df6462d4eaef2ecbf6dc28541a"),
    INSTANCE_REGISTRY_CONTRACT: JSON.stringify("0x4728e0a668df2aa10fcedf954228b775cdd45c21"),
    ETHERSCAN_URL: JSON.stringify("https://kovan.etherscan.io"),
    URLSHORTENER_API_KEY: JSON.stringify("AIzaSyDS1dYnvSQPmC3Bwh5G62nrwFBD1pmveLM"),
    ETHEREUM_NETWORK_ID: JSON.stringify(42),
    SEARCH_COLLECT_ADDRESS: JSON.stringify("0xffc028710c1c98fb43b0f836f26013ccbfcdcb7f"),
    SEARCH_PRICE: 1,
    CONSOLE_ENABLED: false
  }
}

const Config = new webpack.DefinePlugin(configs[process.env.REACT_STATIC_ENV])
export default Config
