# Developing & Building Locally

Should you want to customise or test this integration locally, you can easily do so.

> Note: See [Support](../support.md) for details on customisation support.

## Dependency versions

This demo appliction was developed and tested with:

- Node version 18.x
- NPM version 9.x

## Building

`npm run build`

This builds the project in a variety of configurations:
- `build/main`: es6/commonjs target.
- `build/module`: esnext target.
- `dist`: Webpack distributions meant for loading in the browser. These load the module into the global scope as `ampStylitics`.

## Changing code

All files for the integration are in the `/src` folder.
Once your changes are completed, you will need to run `npm run build` for these changes to be compiled.

## Hosting your JS integration files

Compiled JS files are outputted into the `dist` folder after building the project.

`dist/ampStylitics.browser.umd.min.js` is recommended, but legacy and un-minified options are also provided.

You should host on a HTTPS location that can deal with the demands of requests to this file (ie, CDN).

## Referencing a customised integration in NodeJS projects

You can follow standard principles to either load from a local directory or direct from your own personal Git fork.

### Git
Current dependency in package.json:
`"@amplience/dc-integration-stylitics": "^1.0.0",`

Replace with:
`"@amplience/dc-integration-stylitics": "git+https://github.com/{{your_git-account}}/dc-demostore-integration.git#{{your_version}}",`

## Unit tests

The project includes some simple unit tests to ensure that all possibilities with the argument conversion and widget loader are working as intended.

You can run these with `npm run test`.

![Stylitics tests)](../docs/media/stylitics-tests.png)