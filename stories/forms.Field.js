import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Field from 'ui/forms/Field';
import Dropdown from 'ui/forms/Dropdown';
import Textarea from 'ui/forms/Textarea';

const stories = storiesOf('ui|forms/Field', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { Field } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Field
      label={text('label', 'Some label')}
      bold={boolean('bold', false)}
      subField={boolean('subField', false)}
    >
      Some content
    </Field>
  )),
);

stories.add(
  'field with dropdown',
  withInfo({
    text: `
      ~~~js
      import { Field } from 'pw-ui/ui/forms';
      ~~~
    `,
    propTablesExclude: [Dropdown]
  })(() => (
    <Field
      label={text('label', 'Some label')}
      bold={boolean('bold', false)}
      subField={boolean('subField', false)}
    >
      <Dropdown
        title={'Select'}
        options={[
          { label: 'First option', value: 7 },
          { label: 'Second Option', value: 14 },
          { label: 'Third Option', value: 21 },
          { label: 'Last Option', value: 28 },
        ]}
        className={'className', 'fs12 p1 bg-orange border-orange'}
        containerClass={'containerClass', 'mr1 fs12 white'}
      />
    </Field>
  )),
);

stories.add(
  'field with textarea',
  withState({ value: 'Some text' })(
    withInfo({
      text: `
        ~~~js
        import { Field } from 'pw-ui/ui/forms';
        ~~~
      `,
      propTablesExclude: [Textarea]
    })(({ store }) => (
      <Field
        label={text('label', 'Some label')}
        bold={boolean('bold', false)}
        subField={boolean('subField', false)}
      >
        <Textarea
          value={store.state.value}
          placeholder={'Some placeholder'}
          autoFocus={'autoFocus', false}
          onChange={(e) => store.set({ value: e })}
        />
      </Field>
    ))
  ),
);
