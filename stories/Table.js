import React from 'react';
import reject from 'lodash/reject';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Table } from 'ui';
import columns from './exampleData/columns';
import records from './exampleData/records';

const stories = storiesOf('ui|Table', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'react-ui/ui';
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
  'Custom',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <Table
        columns={columns}
        records={records}
        dropdown={dropdownOptions}
        highlightClassName={text('highlightClassName', 'bg-sky-blue-highlight')}
        dropdownContainerClassName={text('dropdownContainerClassName', 'inline-block pointer')}
        iconClassName={text('iconClassName', 'inline-block fa-sm blue hover-primary pl1')}
        linkClassName={text('linkClassName')}
        headerTitleClassName={text('headerTitleClassName', 'weight-700 uppercase orange')}
        headerSubtitleClassName={text('headerSubtitleClassName', 'weight-300 uppercase orange')}
        primaryValueClassName={text('primaryValueClassName', 'weight-300 uppercase')}
        secondaryValueClassName={text('secondaryValueClassName', 'weight-200 uppercase')}
        tableBodyContainerClassName={text('tableBodyContainerClassName', ' border bg-gray black')}
        headerContainerClassName={text('headerContainerClassName', 'bg-gradiant-white-gray xs-hide sm-hide flex items-center')}
        showDropdown={boolean('showDropdown', true)}
        isLoading={boolean('isLoading', false)}
        loadingSrc={text('loadingSrc', 'https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif')}
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

stories.add(
  'Loading',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <Table
        columns={columns}
        records={records}
        dropdown={dropdownOptions}
        highlightClassName=""
        showDropdown
        isLoading={boolean('isLoading', true)}
        loadingSrc={text('loadingSrc', 'https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif')}
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

stories.add(
  'Zero State',
  withState({ selectedRecords: [], allSelected: false })(
    withInfo(`
      ~~~js
      import { Table } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <Table
        columns={columns}
        dropdown={dropdownOptions}
        showDropdown
        selectedRecords={store.state.selectedRecords}
        allSelected={store.state.allSelected}
        zeroStateText={text('zeroStateText', 'No records')}
        zeroStateClassName={text('zeroStateClassName', 'p2 center weight-500 sky-blue')}
        highlightClassName=""
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
