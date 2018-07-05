const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFor = require('postcss-for');

module.exports = {
  plugins: [postcssImport, postcssPresetEnv({ stage: 1 }), postcssFor],
};
