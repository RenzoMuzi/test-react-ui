const path = require('path');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve.modules.push(
    path.resolve('./src'),
    path.resolve('./public'),
    path.resolve('./node_modules')
  );

  storybookBaseConfig.module.rules.push(
    {
      test: /\.s?[ac]ss$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../'),
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
    }
  );
  return storybookBaseConfig;
};
