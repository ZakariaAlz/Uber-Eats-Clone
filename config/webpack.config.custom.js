const path = require('path');

module.exports = {
  // Your custom webpack configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add more loaders or plugins as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false, // or 'empty' or 'path-browserify'
    },
  },
  // Add more configuration options such as plugins, optimization, etc.
};
