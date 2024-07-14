const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg|svg|json)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      filename: 'remoteEntry.js',
      remotes: {
        'm_api': 'm_api@http://localhost:3010/remoteEntry.js',
        'm_lib': 'm_lib@http://localhost:3011/remoteEntry.js',
        'm_auth': 'm_lib@http://localhost:3012/remoteEntry.js',
        'm_list': 'm_lib@http://localhost:3013/remoteEntry.js',
        'm_register': 'm_register@http://localhost:3014/remoteEntry.js',
      },
      exposes: {
        './CurrentUserContext': './src/contexts/CurrentUserContext.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true
        },
        "react-dom": {
          singleton: true,
          eager: true
        },
        "react-router-dom": {
          singleton: true,
          eager: true
        },
        "react-singleton-context": {
          singleton: true,
          eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
  ],
};
