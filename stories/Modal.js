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
      import { BasicModal } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <div className="center">
        <button type="button" className="pc-btn" onClick={() => store.set({ isOpen: true })}>
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
  'Custom Basic Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { BasicModal } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <div className="center">
        <button type="button" className="pc-btn" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <BasicModal
          isOpen={boolean('isOpen', store.state.isOpen)}
          title={text('title', 'Info')}
          body={text('body', 'Some other content in this modal')}
          headerClassName={text('headerClassName', 'p2 flex justify-between border border-gray-100 bg-orange')}
          contentClassName={text('contentClassName', 'center border border-gray-100')}
          bodyClassName={text('bodyClassName', 'mt3 sky-blue')}
          titleClassName={text('titleClassName', 'fs16 weight-700 black')}
          closeIconClassName={text('closeIconClassName', 'fa fa-times fs16 weight-700 black')}
          closeButtonClassName={text('closeButtonClassName', 'pc-btn--big sky-blue bold bg-gray')}
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
      import { Modal } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <div className="center">
        <button type="button" className="pc-btn" onClick={() => store.set({ isOpen: true })}>
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

stories.add(
  'Custom Standard Modal',
  withState({ isOpen: false })(
    withInfo(`
      ~~~js
      import { Modal } from 'react-ui/ui';
      ~~~
    `)(({ store }) => (
      <div className="center">
        <button type="button" className="pc-btn" onClick={() => store.set({ isOpen: true })}>
          Open modal
        </button>
        <Modal
          isOpen={boolean('isOpen', store.state.isOpen)}
          position={text('position', 'center')}
          styleClass={text('styleClass', 'bg-gray')}
          contentClassName={text('contentClassName', 'bold sky-blue')}
          backgroundClassName={text('backgroundClassName', 'bg-white')}
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
