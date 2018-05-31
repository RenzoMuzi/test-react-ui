import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import EditAttributeModal from 'ui/forms/EditAttributeModal';
import EditableText from 'ui/forms/EditableText';
import Dropdown from 'ui/forms/Dropdown';

const stories = storiesOf('ui|forms/EditAttributeModal', module);
stories.addDecorator(withKnobs);

stories.add(
  'open modal',
  withInfo(`
    ~~~js
    import { EditAttributeModal } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditAttributeModal
      title={text('title', 'Some title')}
      isOpen={boolean('isOpen', true)}
      onClose={action('cancel')}
      onSubmit={action('save')}
    >
      Some content
    </EditAttributeModal>
  )),
);

stories.add(
  'open modal, with content',
  withInfo({
    text: `
      ~~~js
      import { EditAttributeModal } from 'pw-ui/ui/forms';
      ~~~
    `,
    propTablesExclude: [Dropdown, EditableText]
  })(() => (
    <EditAttributeModal
      title={text('title', 'Some title')}
      isOpen={boolean('isOpen', true)}
      onClose={action('cancel')}
      onSubmit={action('save')}
    >
      <EditableText
        text={'Some editable text'}
        placeholder={'Placeholder'}
        isEditable
      />
      <div className='my1'/>
      <EditableText
        text={'Some informative text'}
        placeholder={'Placeholder'}
        isEditable={false}
      />
      <div className='my1'/>
      <Dropdown
        title={'Select'}
        options={[
          { label: 'First option', value: 7 },
          { label: 'Second Option', value: 14 },
          { label: 'Third Option', value: 21 },
          { label: 'Last Option', value: 28 },
        ]}
        className={'fs12 p1 bg-orange border-orange'}
        containerClass={'containerClass', 'mr1 fs12 white'}
      />
    </EditAttributeModal>
  )),
);
