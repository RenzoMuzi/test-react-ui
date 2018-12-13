import image from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import url from 'rollup-plugin-url';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const bundles = [
  'index',
  'BasicModal',
  'BasicTable',
  'Button',
  'Checkbox',
  'Chicklet',
  'CustomDropdown',
  'DatePicker',
  'DateTimePicker',
  'DropdownHeader',
  'EditableText',
  'Field',
  'FilteredBy',
  'FloatingList',
  'Icon',
  'Input',
  'Loading',
  'Modal',
  'Pagination',
  'Popover',
  'ShowMore',
  'Sorter',
  'Table',
  'Tabs',
  'Textarea',
  'ToggleSwitch',
  'ViewOnlyText',
];

const config = bundles.map(component => ({
  input: `src/ui/${component}.js`,
  output: [
    {
      file: `lib/${component}.js`,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'classnames',
    'prop-types',
    'react-dom'
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    image(),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs(),
    uglify()
  ],
}));

export default config;
