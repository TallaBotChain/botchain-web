import axios from 'axios'
import config from './config'

export default {
  getSiteProps: ({dev}) => config(dev),
  getRoutes: async () => {
    return [
      {
        path: '/no_metamask',
        component: 'src/containers/NoMetamask',
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
