import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Checkbox from 'ui/forms/Checkbox';

const stories = storiesOf('ui|forms/Checkbox', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withState({ value: false })(
    withInfo(`
      ~~~js
      import { Checkbox } from 'pw-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <Checkbox
        value={boolean('value', store.state.value)}
        onChange={() => store.set({ value: !store.state.value })}
        viewOnly={boolean('viewOnly', false)}
      />
    ))
  ),
);
