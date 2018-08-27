import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import ToggleSwitch from 'ui/forms/ToggleSwitch';
import { withState } from '@dump247/storybook-state';

const stories = storiesOf('ui|forms/ToggleSwitch', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withState({ value: false })(
    withInfo(`
    ~~~js
    import { ToggleSwitch } from 'pw-ui/ui/forms';
    ~~~
    `)(({ store }) => (
      <ToggleSwitch
        {...store.state}
        onChange={() => store.set({ value: !store.state.value })}
        viewOnly={boolean('viewOnly', false)}
      />
    ))),
);

stories.add(
  'View only',
  withState({ value: true })(
    withInfo(`
    ~~~js
    import { ToggleSwitch } from 'pw-ui/ui/forms';
    ~~~
    `)(({ store }) => (
      <ToggleSwitch
        {...store.state}
        onChange={() => store.set({ value: !store.state.value })}
        viewOnly={boolean('viewOnly', true)}
      />
    ))),
);
