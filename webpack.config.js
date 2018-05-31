const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanPlugin = require('webpack-clean');

module.exports = {
  mode: 'development',
  entry: {
    'ui/index.js': './src/ui/index.js',
    'ui/forms/index.js': './src/ui/forms/index.js',
    'utils/index.js': './src/utils/index.js',
    styles: './src/styles/index.css',
  },
  output: {
    path: path.join(__dirname, './'),
    filename: '[name]',
    library: 'index',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./public'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.otf$/,
        loader:
          'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackCleanPlugin(['styles']),
  ],
};
