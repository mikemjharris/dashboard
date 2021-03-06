const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch: true,
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },


  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./style.css"
    })
  ]
};
