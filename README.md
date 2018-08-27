# PW-UI

PW-UI is a collection of generic components and helpers used by the Prescribewellness development team on their projects.

## Installation
PW-UI is available as an npm package, so you can install it with your package manager of preference.

For example:
```
npm i pw-ui
```

## Usage
The following modules are available:

- `pw-ui/ui`: Contains all the UI components available.
- `pw-ui/ui/forms`: Subset of `ui` with form components.
- `pw-ui/utils`: Collection of helpers used for formatting, parsing data, etc.

## Building the project locally
If you want to make changes to the library (maybe even contribute!). You can clone the project and get it up and running with the following steps:
```
git clone git@github.com:moove-it/pw-ui.git
cd pw-ui
npm install
npm run build # If you want to build only
npm run build:watch # If you want to try changes immediately
```

## Storybook
PW-UI has [Storybook](https://github.com/storybooks/storybook) it allows you to browse a component library, view the different states of each component, and interactively develop and test components. You can use the public instance [available here](https://moove-it.github.io/pw-ui) or clone the project and run it locally with `npm run storybook`

## Contributing
If you want to contribute, please check the [contributing guidelines](./CONTRIBUTING.md)

