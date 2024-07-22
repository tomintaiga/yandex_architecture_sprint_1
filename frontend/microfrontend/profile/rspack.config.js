const {
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3034/',
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
      name: 'profile',
      filename: 'remoteEntry.js',
      remotes: {
        'm_main': 'm_main@http://localhost:3000/remoteEntry.js',
      },
      exposes: {
        './Profile': './src/components/Profile.js',
        "./EditAvatarPopup": "./src/components/EditAvatarPopup.js",
        "./EditProfilePopup": "./src/components/EditProfilePopup.js",
        "./EditAvatarPopupContext": "./src/contexts/EditAvatarPopupContext.js",
        "./EditProfilePopupContext": "./src/contexts/EditProfilePopupContext.js",
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
  ],
};
