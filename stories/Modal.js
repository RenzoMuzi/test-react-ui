import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Modal from 'ui/Modal';
import BasicModal from 'ui/BasicModal';

const stories = storiesOf('ui|Modal', module);
stories.addDecorator(withKnobs);

stories.add(
  'Basic Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { BasicModal } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <div>
        <button type="button" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <BasicModal
          isOpen={boolean('isOpen', store.state.isOpen)}
          title={text('title', 'Info')}
          body={text('body', 'Some content')}
          onClose={() => store.set({ isOpen: false })}
          allowScrolling
        />
      </div>
    )),
  ),
);

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
              src="https://ih1.redbubble.net/image.420294057.8666/ap,550x550,16x12,1,transparent,t.u1.png"
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
