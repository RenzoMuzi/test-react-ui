# React-UI

react-ui is a collection of generic components and helpers used by the Mooveit development team on their projects.

## Installation
react-ui is available as an npm package, so you can install it with your package manager of preference.

For example:
```
npm i @mooveit-team/react-ui
```

## Usage
The following modules are available:

- `@mooveit-team/react-ui/ui`: Contains all the UI components available.
- `@mooveit-team/react-ui/forms`: Subset of `ui` with form components.
- `@mooveit-team/react-ui/utils`: Collection of helpers used for formatting, parsing data, etc.

In order to use @mooveit-team/react-ui style you will need to add them to your project:

```
@import '@mooveit-team/react-ui/kd-styles';
@import '@mooveit-team/react-ui/variables';
@import '@mooveit-team/react-ui/styles';
@import '@mooveit-team/react-ui/styles-font-awesome';
```
### Color Customization
if you want to change the colors of the default styles of the component you have two options:

####  1. Using one of the default color palletes
Currently we have two options in separate files, you can import the one that you want to override the styles:
 1. `variables.css`: Default styling
 2. `variables-pw-ui.css`: pw-ui color pallete.

####  2. Overriding the css variables by hand
The following variables are used to define the colors of the default styles:
```css
# Example default styles, you can change the ones that you need.
:root {
    --gray-primary: #686865;
    --gray-primary-active: #585858;
    --gray-secondary: #BABABA;
    --gray-background: #F4F4F4;
    --gray-background-muted: color-mod(var(--gray-primary) alpha(80%));
    --gray-border: #DDDDDD;

    --gray-header: #f5f5f5;

    --green-success: #85CCB8;
    --green-primary: #369f31;

    --primary: #0a0a36;
    --primary-active: #18189b;
    --primary-hover: #2c2cb1;
    --primary-hover-muted: #2c2cb1cc;
    --primary-highlight: #f0f0fc;

    --crimson: #FD0808;

    --sky-blue: #65b3d0;
    --sky-blue-highlight: color-mod(var(--sky-blue) alpha(40%));;

    --sky-blue-dark: #316eaa;

    --white: #FFFFFF;
    --white-muted: #FFFFFF90;
    --transparent: #FFFFFF00;
  }
```

## Building the project locally
If you want to make changes to the library (maybe even contribute!). You can clone the project and get it up and running with the following steps:
```
git clone git@github.com:moove-it/react-ui.git
cd @mooveit-team/react-ui
npm install
npm run build # If you want to build only
npm run build:watch # If you want to try changes immediately
```

## Storybook
@mooveit-team/react-ui has [Storybook](https://github.com/storybooks/storybook) it allows you to browse a component library, view the different states of each component, and interactively develop and test components. You can use the public instance [available here](https://moove-it.github.io/react-ui) or clone the project and run it locally with `npm run storybook`

## Contributing
If you want to contribute, please check the [contributing guidelines](./CONTRIBUTING.md)
