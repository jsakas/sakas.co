const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jon Sakas',
    }),
    new ExtractCssChunks(),
  ],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src', 'components'),
      'images': path.resolve(__dirname, 'src', 'images'),
      'pages': path.resolve(__dirname, 'src', 'pages'),
      'styles': path.resolve(__dirname, 'src', 'styles'),
      '@history': path.resolve(__dirname, 'src', 'history'),
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
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
  devServer: {
    port: 5280,
    historyApiFallback: true
  }
};
