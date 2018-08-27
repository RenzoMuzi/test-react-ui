import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { withKnobs, number, array, text } from '@storybook/addon-knobs';
import Pagination from 'ui/Pagination';

const stories = storiesOf('ui|Pagination', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withState({
    pageSize: 10,
    startIndex: 0,
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
        pageSizeOptions={array('ppageSizeOptions', [10, 100, 500, 1000])}
        pageClassName={text('pageClassName')}
        changePageClassName={text('changePageClassName')}
        disabledColor={text('disabledColor')}
        selectClassName={text('selectClassName')}
      />
    )),
  ),
);

stories.add(
  'Custom',
  withState({
    pageSize: 10,
    startIndex: 0,
  })(
    withInfo(`
    ~~~js
    import { Pagination } from 'pw-ui/ui';
    ~~~
    `)(({ store }) => (
      <Pagination
        text={text('text')}
        onPaginationChange={(change) => store.set(change)}
        count={number('count', 128)}
        pageSize={store.state.pageSize}
        startIndex={number('startIndex', store.state.startIndex)}
        pageSizeOptions={array('ppageSizeOptions', [20, 40, 50])}
        pageClassName={text('pageClassName', 'sky-blue bold')}
        changePageClassName={text('changePageClassName', 'blue')}
        disabledColor={text('disabledColor', 'gray')}
        selectClassName={text('selectClassName')}
      />
    )),
  ),
);
