import axios from 'axios'

export default {
  getSiteProps: ({dev}) => ( dev ? { // development
    title: '[DEV] Botchain',
    api_endpoint: 'http://localhost:3001',
    botchain_contract: "0xaf8153cdc92563dc18aee3470e3dc53da0560830"
    } : { // production
      title: 'Botchain',
      api_endpoint: 'https://TBD',
      botchain_contract: "0xaf8153cdc92563dc18aee3470e3dc53da0560830"
    }
  ),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Signin',
      },
      {
        path: '/registration',
        component: 'src/containers/Registration',
      },
      {
        path: '/developer',
        component: 'src/containers/Developer',
      },
      {
        path: '/bot/new',
        component: 'src/containers/CreateBot',
      },
      {
        path: '/bots',
        component: 'src/containers/Bots',
      },
      {
        is404: true,
        component: 'src/containers/404',
      }
    ]
  },
  // webpack: (config, { defaultLoaders }) => {
  //   config.module.rules = [
  //     {
  //       oneOf: [
  //         {
  //           test: /\.json$/,
  //           use: [{ loader: 'json-loader' }],
  //         },
  //         defaultLoaders.jsLoader,
  //         defaultLoaders.cssLoader,
  //         defaultLoaders.fileLoader,
  //       ],
  //     },
  //   ]
  //   return config
  // },
}
