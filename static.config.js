import React from 'react'
import Config from './config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


export default {
  getRoutes: async () => {
    return [
      { path: '/',
        component: 'src/containers/Search'
      },
      { path: '/bots',
        component: 'src/containers/Bots'
      },
      { path: '/developer',
        component: 'src/containers/Developer'
      },
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
    config.plugins.push( new ExtractTextPlugin({
          filename: getPath => {
            process.env.extractedCSSpath = getPath('styles.[hash:8].css')
            return process.env.extractedCSSpath
          },
          allChunks: true,
        }));

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use:
            process.env.REACT_STATIC_ENV === 'development'
            ? [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
            : ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: false,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: { includePaths: ['src/'] },
                },
              ],
            }),
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ]
      }
    ]
    return config
  }
}
