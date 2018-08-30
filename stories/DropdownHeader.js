import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import DropdownHeader from 'ui/DropdownHeader';

const stories = storiesOf('ui|DropdownHeader', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { DropdownHeader } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <DropdownHeader
      placeholder={text('placeholder', 'Select')}
      label={text('label', '')}
      selectIcon={boolean('selectIcon', true)}
      isOpen={boolean('isOpen', false)}
    />
  )),
);

stories.add(
  'With selected option',
  withInfo(`
    ~~~js
    import { DropdownHeader } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <DropdownHeader
      placeholder={text('placeholder', 'Select')}
      label={text('label', 'Selected option')}
      selectIcon={boolean('selectIcon', true)}
      containerClassName={text('containerClassName', 'flex justify-between border border-silver rounded pointer fs12 p1 pointer')}
      isOpen={boolean('isOpen', false)}
    />
  )),
);
