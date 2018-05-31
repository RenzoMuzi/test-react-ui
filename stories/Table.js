import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Table from '../src/ui/Table';

const testColumns = [
  {
    title: 'Name',
    key: 'attrName',
  },
  {
    title: 'Address',
    key: 'attrAddress',
  },
  {
    title: 'Phone Number',
    key: 'phone',
  },
];

const testRecords = [
  { attrName: 'Miranda F Ayala', attrAddress: '2414  Hill Street', phone: '419-786-2804' },
  { attrName: 'Patricia A Soto', attrAddress: '1958  Lake Forest Drive', phone: '914-260-6053' },
  { attrName: 'Victoria R Hartshorn', attrAddress: '3476  Perry Street', phone: '810-671-2851' },
  { attrName: 'Jennifer C Coats', attrAddress: '22895  Rocky Road', phone: '215-652-0730' },
  { attrName: 'Crystal C Brooks', attrAddress: '4410  Leroy Lane', phone: '605-935-5693' },
];

const columnHeader = column => (
  <div className="fs10 left">
    <div key={column.title} className="weight-700">
      {column.title}
    </div>
  </div>
);

const cell = (record, column) => (
  <div className="weight-300 fs10 lh2">
    <div>
      {record[column.key]}
    </div>
  </div>
);

const stories = storiesOf('ui|Table', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withInfo(`
  ~~~js
  import { Table } from 'pw-ui/ui';
  ~~~
  `)(() => (
    <Table
      columns={testColumns}
      records={testRecords}
      columnHeader={columnHeader}
      cell={cell}
      alignTop={boolean('alignTop', true)}
      selectAction={boolean('selectAction', false)}
      onSelectChange={action('selected row')}
      onSelectAllChange={action('selected all')}
    />
  )),
);
