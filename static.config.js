import axios from 'axios'
import config from './config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  getSiteProps: ({dev}) => config(dev),
  getRoutes: async () => {
    return [
      { path: '/',
        component: 'src/containers/Search'
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
  webpack: (config, { defaultLoaders, stage }) => {
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
            stage === 'dev'
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
        ],
      },
    ]
    return config
  }
}
