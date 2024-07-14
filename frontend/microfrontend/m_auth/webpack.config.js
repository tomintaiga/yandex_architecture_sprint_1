const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
module.exports = {
  entry: './auth.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3012/',
    clean: true,
  },
  module: {},
  cache: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'm_auth',
      filename: 'remoteEntry.js',
      exposes: {
        "./auth" : "./auth.js"
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
