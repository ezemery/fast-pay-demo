const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    newUserForm: ['./src/assets/js/new-user-form.js'],
    newUserButton: ['./src/assets/js/new-user-button.js'],
    returningUserButton: ['./src/assets/js/returning-user-button.js'],
    returningUserForm: ['./src/assets/js/returning-user-form.js'],
    fastCheckout: ['./src/assets/js/fastcheckout.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/js'),
    filename: '[name].js'
  },
  //watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            // options: {
            //   mimetype: 'image/png'
            // }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;