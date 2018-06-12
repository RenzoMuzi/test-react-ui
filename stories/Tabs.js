import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Tabs, { Tab } from 'ui/Tabs';

const stories = storiesOf('ui|Tabs', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withInfo(`
    ~~~js
    import { Tabs,  Tab } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <Tabs
      onTabChange={action('tab change')}
      active="First Tab"
      subtab={boolean('subtab', false)}
    >
      <Tab name="First Tab" title="First Tab">
        <p>
          Lorem ipsum dolor sit <b>amet</b>
        </p>
      </Tab>
      <Tab name="Second Tab" title="Second Tab">
        {' '}
        This is another content tab
      </Tab>
      <Tab name="Last Tab" title="Last Tab">
        Hello world!
      </Tab>
      <Tab name="Right Tab" title="Right Tab" right>
        Right Tab!
      </Tab>
    </Tabs>
  )),
);
