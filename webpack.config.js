const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};