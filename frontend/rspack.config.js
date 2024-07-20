const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require('@rspack/core');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg|svg|json)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'm_main',
      filename: 'remoteEntry.js',
      remotes: {
        "login": "login@http://localhost:3031/remoteEntry.js",
        "register": "register@http://localhost:3032/remoteEntry.js",
        'm_list': 'm_list@http://localhost:3013/remoteEntry.js',
        'm_popup': 'm_popup@http://localhost:3015/remoteEntry.js',
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
    new HtmlRspackPlugin({
      template: './public/index.html',
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
  ],
};
