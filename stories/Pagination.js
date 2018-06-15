import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { withKnobs, number } from '@storybook/addon-knobs';
import Pagination from 'ui/Pagination';

const stories = storiesOf('ui|Pagination', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withState({
    pageSize: 10,
    startIndex: 0
  })(
    withInfo(`
    ~~~js
    import { Pagination } from 'pw-ui/ui';
    ~~~
    `)(({ store }) => (
      <Pagination
        onPaginationChange={(change) => store.set(change)}
        count={number('count', 128)}
        pageSize={store.state.pageSize}
        startIndex={number('startIndex', store.state.startIndex)}
      />
    ))
  ),
);
