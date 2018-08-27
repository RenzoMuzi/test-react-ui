import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Tabs, { Tab } from 'ui/Tabs';

const stories = storiesOf('ui|Tabs', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withState({ activeTab: [] })(
    withInfo(`
      ~~~js
      import { Tabs,  Tab } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Tabs
        onTabChange={(index, name) => {
          action('tab change')(index, name);
          store.set({ activeTab: name });
        }}
        active={text('First Tab', store.state.activeTab)}
        subtab={boolean('subtab', false)}
      >
        <Tab name="First Tab" title="First Tab">
          Lorem ipsum dolor sit <b>amet</b>
        </Tab>
        <Tab name="Second Tab" title="Second Tab">
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
  ),
);

stories.add(
  'Custom Tabs',
  withState({ activeTab: [] })(
    withInfo(`
      ~~~js
      import { Tabs,  Tab } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Tabs
        onTabChange={(index, name) => {
          action('tab change')(index, name);
          store.set({ activeTab: name });
        }}
        active={text('First Tab', store.state.activeTab)}
        className={text('className', 'rounded-top weight-400 fs13 mr1 bg-gray border ')}
        activeClassname={text('activeClassname', 'red')}
        subtab={boolean('subtab', false)}
      >
        <Tab name="First Tab" title="First Tab">
          Lorem ipsum dolor sit <b>amet</b>
        </Tab>
        <Tab name="Second Tab" title="Second Tab">
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
  ),
);

stories.add(
  'With SubTabs and space',
  withState({ activeTab: [] })(
    withInfo(`
      ~~~js
      import { Tabs,  Tab } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Tabs
        onTabChange={(index, name) => {
          action('tab change')(index, name);
          store.set({ activeTab: name });
        }}
        active={text('First Tab', store.state.activeTab)}
        className={text('className', 'rounded-top weight-400 fs13 mr1 bg-gray border ')}
        activeClassname={text('activeClassname', 'red')}
        subtab={boolean('subtab', true)}
        spaced={boolean('spaced', true)}
      >
        <Tab name="First Tab" title="First Tab">
          Lorem ipsum dolor sit <b>amet</b>
        </Tab>
        <Tab name="Second Tab" title="Second Tab">
          This is another content tab
        </Tab>
        <Tab name="Last Tab" title="Last Tab">
          Hello world!
        </Tab>
      </Tabs>
    )),
  ),
);
