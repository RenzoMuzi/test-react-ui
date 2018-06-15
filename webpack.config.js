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
    'styles-font-awesome': './src/styles/font-awesome-fonts.scss',
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      },
      {
        test: /.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'public/fonts/[name].[ext]',
            publicPath: '../../node_modules/pw-ui',
          },
        }],
      },
      {
        test: /\.otf$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 65000,
            mimetype: 'application/octet-stream',
            name: 'public/fonts/[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackCleanPlugin(['styles', 'styles-font-awesome']),
  ],
};
