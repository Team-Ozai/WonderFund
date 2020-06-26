const path = require('path')

module.exports = {
  entry: "./client/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "./client/dist"),
    filename:"bundle.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude:/node_modules/,
      loader: "babel-loader"
    }]
  }
}