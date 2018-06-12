import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import FilteredBy from 'ui/FilteredBy';

const stories = storiesOf('ui|FilteredBy', module);
stories.addDecorator(withKnobs);

const initialFilters = [
  {
    label: 'Label 1', value: 'value1', operator: 'Eq',
  },
  {
    label: 'Label 2', value: 5, operator: 'Gte',
  },
  {
    label: 'Label 3', value: [4, 6], operator: 'Between',
  },
];

stories.add(
  'default',
  withState({ filters: initialFilters })(
    withInfo(`
      ~~~js
      import { FilteredBy } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <FilteredBy
        className={text('className', '')}
        chickletClassName={text('chickletClassName', '')}
        filters={array('filters', store.state.filters)}
        onChange={filters => store.set({ filters })}
      />
    )),
  ),
);
