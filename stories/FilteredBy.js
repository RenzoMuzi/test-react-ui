import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
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

const initialExcludedFilters = [
  {
    label: 'Excluded Label 1', value: 'exc', operator: 'Eq',
  },
  {
    label: 'Excluded Label 2', value: 11, operator: 'Gte',
  },
];

stories.add(
  'Default',
  withState({ filters: initialFilters })(
    withInfo(`
      ~~~js
      import { FilteredBy } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <FilteredBy
        className={text('className')}
        chickletClassName={text('chickletClassName', '')}
        filters={object('filters', store.state.filters)}
        onChange={(filters, i) => store.set(
          { filters: store.state.filters.slice(0, i).concat(store.state.filters.slice(i + 1)) })}
      />
    )),
  ),
);


stories.add(
  'Custom',
  withState({ filters: initialFilters })(
    withInfo(`
      ~~~js
      import { FilteredBy } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <FilteredBy
        className={text('className', 'sky-blue bold')}
        chickletClassName={text('chickletClassName', 'bg-gray-highlight gray-primary ')}
        filters={object('filters', store.state.filters)}
        onChange={(filters, i) => store.set(
          { filters: store.state.filters.slice(0, i).concat(store.state.filters.slice(i + 1)) })}
      />
    )),
  ),
);

stories.add(
  'With excluded filters',
  withState({ filters: initialFilters, excluded: initialExcludedFilters })(
    withInfo(`
      ~~~js
      import { FilteredBy } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <FilteredBy
        className={text('className', 'sky-blue bold')}
        chickletClassName={text('chickletClassName', 'bg-gray-highlight gray-primary ')}
        filters={object('filters', store.state.filters)}
        filtersExclude={object('filtersExclude', store.state.excluded)}
      />
    )),
  ),
);
