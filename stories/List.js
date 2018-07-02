import React from 'react';
import reject from 'lodash/reject';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { List } from 'ui';
import columns from './exampleData/columns';
import records from './exampleData/records';

const stories = storiesOf('ui|List', module);

stories.add(
  'default',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { List } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <List
        columns={columns}
        records={records}
        selectedRecords={store.state.selectedRecords}
        allSelected={store.state.allSelected}
        onRowChange={({ value, PatientId }) => {
          if (value) {
            const newRecords = store.state.selectedRecords;
            newRecords.push(PatientId);
            store.set({ selectedRecords: newRecords });
          } else {
            const oldRecords = store.state.selectedRecords;
            store.set({ selectedRecords: reject(oldRecords, (id) => id === PatientId) });
          }
        }}
        onAllChange={() => {
          if (store.state.allSelected) {
            store.set({
              selectedRecords: [],
              allSelected: false,
            });
          } else {
            store.set({
              selectedRecords: records.map((r) => r.PatientId),
              allSelected: true,
            });
          }
        }}
      />
    )),
  ),
);
