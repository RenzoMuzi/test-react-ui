const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { IgnorePlugin } = require('webpack');
const WebpackCleanPlugin = require('webpack-clean');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    'ui/index.js': './src/ui/index.js',
    'ui/forms/index.js': './src/ui/forms/index.js',
    'utils/index.js': './src/utils/index.js',
    styles: './src/styles/index.css',
    'kd-styles': './src/styles/kd-themes/pw.css',
    'styles-font-awesome': './src/styles/font-awesome-fonts.scss',
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../node_modules/pw-ui/',
            },
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../node_modules/pw-ui/',
            },
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      },
      {
        test: /.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'public/fonts/[name].[ext]',
              publicPath: '../../node_modules/pw-ui',
            },
          },
        ],
      },
      {
        test: /\.otf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 65000,
              mimetype: 'application/octet-stream',
              name: 'public/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      { from: 'package.json', to: 'package.json' },
      { from: 'variables.css', to: 'variables.css' },
    ]),
    new WebpackCleanPlugin([
      'dist/styles',
      'dist/styles-font-awesome',
      'dist/kd-styles',
    ]),
    new BundleAnalyzerPlugin(),
  ],
};
