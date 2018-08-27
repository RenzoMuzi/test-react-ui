import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Field from 'ui/forms/Field';
import CustomDropdown from 'ui/CustomDropdown';
import TextArea from 'ui/forms/Textarea';

const stories = storiesOf('ui|forms/Field', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { Field } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Field
      label={text('label', 'Some label')}
      contentClassName={text('contentClassName', 'col col-8 lh3')}
      fieldClassNames={text('fieldClassNames', '')}
      labelClassNames={text('labelClassNames', '')}
      bold={boolean('bold', false)}
      subField={boolean('subField', false)}
    >
      ...Some content....
    </Field>
  )),
);

stories.add(
  'Field with dropdown',
  withInfo({
    text: `
      ~~~js
      import CustomDropdown from 'pw-ui/ui/CustomDropdown';
      ~~~
    `,
    propTablesExclude: [CustomDropdown],
  })(() => (
    <Field
      label={text('label', 'Some label')}
      bold={boolean('bold', false)}
      subField={boolean('subField', false)}
    >
      <CustomDropdown
        handleSelect={action('changed')}
        placeholder={text('title', 'Select')}
        options={object('options', [
          { label: 'First option', value: 7 },
          { label: 'Second Option', value: 14 },
          { label: 'Third Option', value: 21 },
          { label: 'Last Option', value: 28 },
        ])}
        viewOnly={boolean('viewOnly', false)}
        containerClassName={text('containerClass', 'relative full-width fs12 mr1')}
        className={text('className', 'flex flex-center justify-between border rounded pointer fs12 p1 bg-orange border-orange white')}
        optionsContainerClassName="absolute border-bottom-shadow bg-white min-full-width flex flex-column z3 border border-gray gray-primary rounded max-height-2 overflow-scroll"
        optionClassName="p1 nowrap custom-select-option pointer"
        disabledOptionClassName="p1 nowrap gray"
        listContainerClassName={text('listContainerClassName', 'border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      />
    </Field>
  )),
);

stories.add(
  'Field with textarea',
  withState({ value: 'Some text' })(
    withInfo({
      text: `
        ~~~js
        import { Field } from 'pw-ui/ui/forms';
        ~~~
      `,
      propTablesExclude: [TextArea],
    })(({ store }) => (
      <Field
        label={text('label', 'Some label')}
        bold={boolean('bold', false)}
        subField={boolean('subField', false)}
      >
        <TextArea
          value={store.state.value}
          placeholder="Some placeholder"
          onChange={(e) => store.set({ value: e })}
        />
      </Field>
    )),
  ),
);
