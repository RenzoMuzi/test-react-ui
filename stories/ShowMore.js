import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import ShowMore from 'ui/ShowMore';

const stories = storiesOf('ui|ShowMore', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { ShowMore } from 'react-ui/ui';
    ~~~
  `)(() => (
    <ShowMore
      className={text('className')}
      iconClassName={text('iconClassName')}
      showMoreText={text('showMoreText label')}
      showLessText={text('showLessText lable')}
    >
      <div>
        This is the content...
      </div>
    </ShowMore>
  )),
);

stories.add(
  'Custom',
  withInfo(`
    ~~~js
    import { ShowMore } from 'react-ui/ui';
    ~~~
  `)(() => (
    <ShowMore
      className={text('className', 'fs20 sky-blue')}
      iconClassName={text('iconClassName', 'sky-blue')}
      showMoreText={text('showMoreText label', 'This can show more info')}
      showLessText={text('showLessText lable', 'Or less info')}
    >
      <div>
        This is the content...
      </div>
    </ShowMore>
  )),
);
