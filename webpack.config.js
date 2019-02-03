const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/pages/index/main.js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Main',
      chunks: ['main', "vendor", "manifest"],
      template: './src/pages/index/index.html',
      filename: 'index.html',
      chunksSortMode: 'dependency',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};