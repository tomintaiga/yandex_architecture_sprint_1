const path = require('path');

module.exports = {
  entry: './src/api.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.js',
    globalObject: 'this',
    library: {
      name: 'api',
      type: 'umd',
    },
  },
};