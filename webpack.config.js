const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { IgnorePlugin } = require('webpack');
const WebpackCleanPlugin = require('webpack-clean');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    'index.js': './src/index.js',
    'ui.js': './src/ui/index.js',
    'forms.js': './src/ui/forms/index.js',
    styles: './src/styles/index.css',
    'kd-styles': './src/styles/kd-themes/pw.css',
    'styles-font-awesome': './src/styles/font-awesome-fonts.scss',
  },
  output: {
    path: path.join(__dirname, ''),
    publicPath: '/',
    filename: '[name]',
    library: 'react-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./public'),
      path.resolve('./node_modules'),
    ],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
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
              publicPath: '../../node_modules/@mooveit-team/react-ui/',
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
              publicPath: '../../node_modules/@mooveit-team/react-ui/',
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
              publicPath: '../../node_modules/@mooveit-team/react-ui',
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
    new WebpackCleanPlugin(['styles', 'styles-font-awesome', 'kd-styles']),
    new BundleAnalyzerPlugin(),
  ],
};
