const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WebpackStats = require('webpack-visualizer-plugin');
const { DefinePlugin } = require('webpack');


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
    filename: '[hash].js',
    path: path.resolve(__dirname, 'build', 'static'),
    publicPath: '/static/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'base.html'),
      filename: '../index.html',
      chunks: ['sentry', 'main'],
      inject: false,
      body: ['sentry', 'main'],
      alwaysWriteToDisk: true,
    }),
    new DefinePlugin({
      'APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks(),
    new WebpackStats({
      filename: './bundle.html',
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@images': path.resolve(__dirname, 'src', 'images'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      'styles': path.resolve(__dirname, 'src', 'styles'),
      '@history': path.resolve(__dirname, 'src', 'history'),
      '@docs': path.resolve(__dirname, 'docs'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@audio': path.resolve(__dirname, 'src', 'audio'),
      '@icons': path.resolve(__dirname, 'src', 'icons'),
      '@routes': path.resolve(__dirname, 'src', 'routes'),
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
