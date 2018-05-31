import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Modal from 'ui/Modal';
import ConfirmModal from 'ui/ConfirmModal';
import ErrorModal from 'ui/ErrorModal';
import InformationModal from 'ui/InformationModal';
import LoadingModal from 'ui/LoadingModal';

const stories = storiesOf('ui|Modal', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withInfo(`
    ~~~js
    import { Modal } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <Modal
      isOpen={boolean('isOpen', true)}
      allowScrolling
    >
      <p className="p2 center">
        {text('Modal text', 'Modal content text')}
      </p>
    </Modal>
  )),
);

stories.add(
  'Confirmation Modal',
  withInfo(`
    ~~~js
    import { ConfirmationModal } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <ConfirmModal
      isOpen={boolean('isOpen', true)}
      confirmButtonLabel={text('confirmButtonLabel', 'Ok')}
      description={text('description', 'Confirmation description')}
      message={text('message', 'Modal message')}
      onClose={action('closed modal')}
      onConfirm={action('confirmed modal')}
      allowScrolling
    />
  )),
);

stories.add(
  'Error Modal',
  withInfo(`
    ~~~js
    import { ErrorModal } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <ErrorModal
      title={text('title', 'Error')}
      message={text('message', 'Modal error message')}
      onClose={action('closed modal')}
      allowScrolling
    />
  )),
);

stories.add(
  'Information Modal',
  withInfo(`
    ~~~js
    import { InformationModal } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <InformationModal
      title={text('title', 'Info')}
      body={text('body', 'Some information content')}
      onClose={action('closed modal')}
      allowScrolling
    />
  )),
);

stories.add(
  'Loading Modal',
  withInfo(`
    ~~~js
    import { LoadingModal } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <LoadingModal
      isLoading={boolean('isLoading', true)}
      text={text('text', 'Loading data')}
    />
  )),
);
