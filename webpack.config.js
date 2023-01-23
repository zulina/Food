'use strict';

let path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: './js/script.js',
//   output: {
//     filename: 'bundle.js',
//     path: __dirname + '/js'
//   },
//   watch: true,

//   devtool: "source-map",

//   module: {}
// };

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        // находим js файлы
        test: /\.m?js$/,
        // исключаем ненужные
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                // позволяет выбрать только те полифиллы которые нужны
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};