const path = require('path');

module.exports = {
  entry: './src/auth.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'auth.js',
    globalObject: 'this',
    library: {
      name: 'auth',
      type: 'umd',
    },
  },
};