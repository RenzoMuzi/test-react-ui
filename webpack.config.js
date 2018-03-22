const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    'ui/index': './src/ui/index.js',
    'ui/forms/index': './src/ui/forms/index.js',
    'utils/index': './src/utils/index.js',
  },
  output: {
    path: path.join(__dirname, './'),
    filename: '[name].js',
    library: 'index',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: [
      path.resolve('./src'),
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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
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
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]',
      },
    ],
  },
};
