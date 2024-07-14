const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
module.exports = {
  entry: './api.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3010/',
    clean: true,
  },
  module: {},
  cache: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'm_api',
      filename: 'remoteEntry.js',
      exposes: {
        "./api" : "./api.js"
      },
    }),
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
};
