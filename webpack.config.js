const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const WebpackStats = require('webpack-visualizer-plugin');
const { DefinePlugin } = require('webpack');

const { APP_ENV } = process.env;
const production = (APP_ENV === 'production');

const faviconConfig = require('./favicon.json');

module.exports = {
  mode: process.env.WEBPACK_ENV == 'production' ? 'production' : 'development',
  devtool: process.env.WEBPACK_ENV == 'production' ? 'source-map' : 'none',
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port: 5280,
    historyApiFallback: true,
    disableHostCheck: true,
    index: path.join(__dirname, 'build', 'index.html'),
    contentBase: path.join(__dirname, 'build'),
  },
  entry: {
    main: './src/index.js',
    sentry: './src/integrations/Sentry.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build', 'static'),
    publicPath: '/static/',
  },
  plugins: [
    new DefinePlugin({
      'APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'base.html'),
      filename: '../index.html',
      chunks: ['sentry', 'main'],
      inject: false,
      head: ['sentry'],
      body: ['main'],
      alwaysWriteToDisk: true,
    }),
    new WebappWebpackPlugin({
      logo: path.resolve(__dirname, 'src', 'images', 'icon.png'),
      publicPath: '/static/',
      cache: true,
      inject: 'force',
      favicons: faviconConfig,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks({
      filename: '[hash].css'
    }),
    production &&
    new HtmlBeautifyPlugin(),
    production &&
    new WebpackStats({
      filename: './bundle.html',
    }),
  ].filter(o => o),
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, 'src', 'audio'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@docs': path.resolve(__dirname, 'docs'),
      '@history': path.resolve(__dirname, 'src', 'history'),
      '@icons': path.resolve(__dirname, 'src', 'icons'),
      '@images': path.resolve(__dirname, 'src', 'images'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@routes': path.resolve(__dirname, 'src', 'routes'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@themes': path.resolve(__dirname, 'src', 'themes'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.md$/,
        use: [
          'babel-loader',
          'markdown-to-react-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
};
