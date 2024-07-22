const {
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3015/',
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
      name: 'm_popup',
      filename: 'remoteEntry.js',
      remotes: {
        'm_main': 'm_main@http://localhost:3000/remoteEntry.js',
      },
      exposes: {
        "./AddPlacePopup": "./src/components/AddPlacePopup.js",
        "./ImagePopup": "./src/components/ImagePopup.js",
        "./InfoTooltip": "./src/components/InfoTooltip.js",
        "./AddPlacePopupContext": "./src/contexts/AddPlacePopupContext.js",
        "./ImagePopupContext": "./src/contexts/ImagePopupContext.js",
        "./InfoTooltipContext": "./src/contexts/InfoTooltipContext.js"
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
        }
      },
    }),
  ],
};
