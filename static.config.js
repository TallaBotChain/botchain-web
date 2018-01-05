import axios from 'axios'

export default {
  getSiteProps: () => ({
    title: 'Botchain',
    api_endpoint: 'http://localhost:3001'
  }),
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
