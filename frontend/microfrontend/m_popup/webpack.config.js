const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3015/',
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
      name: 'm_popup',
      filename: 'remoteEntry.js',
      remotes: {
        'm_main': 'm_main@http://localhost:3000/remoteEntry.js',
      },
      exposes: {
        "./AddPlacePopup": "./src/components/AddPlacePopup.js",
        "./EditAvatarPopup": "./src/components/EditAvatarPopup.js",
        "./EditProfilePopup": "./src/components/EditProfilePopup.js",
        "./ImagePopup": "./src/components/ImagePopup.js",
        "./InfoTooltip": "./src/components/InfoTooltip.js",
        "./PopupWithForm": "./src/components/PopupWithForm.js",
        "./AddPlacePopupContext": "./src/contexts/AddPlacePopupContext.js",
        "./EditAvatarPopupContext": "./src/contexts/EditAvatarPopupContext.js",
        "./EditProfilePopupContext": "./src/contexts/EditProfilePopupContext.js",
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
