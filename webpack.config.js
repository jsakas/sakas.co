const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


module.exports = {
  mode: process.env.WEBPACK_ENV || 'development',
  stats: 'errors-only',
  devServer: {
    port: 5280,
    historyApiFallback: true,
    index: path.join(__dirname, 'build', 'index.html'),
    contentBase: path.join(__dirname, 'build'),
  },
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build', 'static'),
    publicPath: '/static/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'base.html'),
      filename: '../index.html',
      chunks: ['main'],
      inject: false,
      body: ['main'],
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks(),
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
        test: /\.(png|jpg|gif|wav)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
};
