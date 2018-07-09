import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import ShowMore from 'ui/ShowMore';

const stories = storiesOf('ui|ShowMore', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { ShowMore } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <ShowMore
      className={text('className')}
      iconClassName={text('iconClassName')}
      showMoreText={text('showMore')}
      showLessText={text('showLessText')}
    >
      <div>
        This is the content...
      </div>
    </ShowMore>
  )),
);
