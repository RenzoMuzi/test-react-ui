import React from 'react';
import reject from 'lodash/reject';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { Table } from 'ui';
import columns from './exampleData/columns';
import records from './exampleData/records';

const stories = storiesOf('ui|Table', module);

stories.add(
  'default',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Table
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

const dropdownOptions = [
  {
    label: 'Option 1',
    value: 10,
    handleItemSelect: () => console.log('Clicked On Option 1'),
  },
  {
    label: 'Option 2',
    value: 20,
    handleItemSelect: () => console.log('Clicked On Option 2'),
  },
  {
    label: 'Option 3',
    value: 30,
    handleItemSelect: () => console.log('Clicked On Option 3'),
  },
];

stories.add(
  'with dropdown',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <Table
        columns={columns}
        records={records}
        dropdown={dropdownOptions}
        showDropdown
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
