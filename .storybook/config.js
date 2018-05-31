import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';
import '../src/styles/index.css';

setOptions({
  name: 'Prescribewellness UI',
  url: 'https://github.com/prescribe-wellness/ui',
  hierarchyRootSeparator: /\|/,
  addonPanelInRight: true,
});

setDefaults({
  header: false,
  inline: true,
});

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
