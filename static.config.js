import React from 'react'
import Config from './config'


export default {
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
  siteRoot: 'https://mysite.com',
  stagingSiteRoot: 'http://localhost:3000',
  webpack: (config, { defaultLoaders }) => {

    config.plugins.push(Config)

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.json$/,
            use: [{ loader: 'json-loader' }],
          },
          defaultLoaders.jsLoader,
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
