import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Sorter from 'ui/Sorter';

const stories = storiesOf('ui|Sorter', module);
stories.addDecorator(withKnobs);

const sortOptions = [
  {
    label: 'Label1', value: 'value1', asc: false, type: 'String',
  },
  {
    label: 'Label2', value: 'label2', asc: false, type: 'String',
  },
  {
    label: 'Label3', value: 'label3', asc: false, type: 'String',
  },
];

stories.add(
  'default',
  withState({ sorting: [] })(
    withInfo(`
      ~~~js
      import { Sorter } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Sorter
        className={text('className', '')}
        chickletClassName={text('chickletClassName', '')}
        dropdownOptions={array('dropdownOptions', sortOptions)}
        dropdownText={text('dropdownText', 'add sorting')}
        sorting={text('sorting', store.state.sorting)}
        onSortChange={sort => store.set({ sorting: sort })}
      />
    )),
  ),
);
