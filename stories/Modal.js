import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Modal from 'ui/Modal';
import ConfirmModal from 'ui/ConfirmModal';
import ErrorModal from 'ui/ErrorModal';
import InformationModal from 'ui/InformationModal';
import LoadingModal from 'ui/LoadingModal';

const stories = storiesOf('ui|Modal', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { Modal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <Modal
          isOpen={boolean('isOpen', store.state.isOpen)}
          position={text('position', 'center')}
          allowScrolling
        >
          <div className="flex flex-column">
            <div>
              <button
                type="button"
                className="m2"
                onClick={() => store.set({ isOpen: false })}
              >
                Close modal
              </button>
            </div>
            <img
              alt="Cats"
              src="http://i0.kym-cdn.com/photos/images/newsfeed/000/191/645/d8d.jpg"
              height="400"
            />
          </div>
          <p className="p2 center">
            {text('Modal text', 'Modal content text')}
          </p>
        </Modal>
      </div>
    )),
  ),
);

stories.add(
  'Confirmation Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { ConfirmationModal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <ConfirmModal
          isOpen={boolean('isOpen', store.state.isOpen)}
          confirmButtonLabel={text('confirmButtonLabel', 'Ok')}
          description={text('description', 'Confirmation description')}
          message={text('message', 'Modal message')}
          onClose={() => store.set({ isOpen: false })}
          onConfirm={action('confirmed modal')}
          allowScrolling
        />
      </div>
    )),
  ),
);

stories.add(
  'Error Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { ErrorModal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <ErrorModal
          isOpen={boolean('isOpen', store.state.isOpen)}
          title={text('title', 'Error')}
          message={text('message', 'Modal error message')}
          onClose={() => store.set({ isOpen: false })}
          allowScrolling
        />
      </div>
    )),
  ),
);

stories.add(
  'Information Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { InformationModal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <InformationModal
          isOpen={boolean('isOpen', store.state.isOpen)}
          title={text('title', 'Info')}
          body={text('body', 'Some information content')}
          onClose={() => store.set({ isOpen: false })}
          allowScrolling
        />
      </div>
    )),
  ),
);

stories.add(
  'Loading Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { LoadingModal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <LoadingModal
          isLoading={boolean('isLoading', store.state.isOpen)}
          text={text('text', 'Loading data')}
        />
      </div>
    )),
  ),
);
