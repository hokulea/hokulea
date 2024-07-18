# Hokulea

[![Test Coverage](https://api.codeclimate.com/v1/badges/5f80d68b3b4412007423/test_coverage)](https://codeclimate.com/github/hokulea/hokulea/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5f80d68b3b4412007423/maintainability)](https://codeclimate.com/github/hokulea/hokulea/maintainability)

Welcome to **Hokulea** the whimsical _Design System_ for _Ember_.

## Installation

You need the following packages:

- Ember API: `@hokulea/ember`
- A theme: `@hokulea/theme-moana` (or your own)
- Theme Loader: `ember-theemo`

Install all of it:

```sh
pnpm add @hokulea/ember @hokulea/theme-moana ember-theemo
```

## Configuration

To load the theme and hokulea assets, add these to your `ember-cli-build.js`:

- add `theemoPlugin()` to webpack plugins (when using embroider)
- add `HokuleaAssetLoaderWebpackPlugin` to webpack
- configure default theme for `theemo`

```js
// ember-cli-build.js
module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // ...
    theemo: {
      defaultTheme: 'moana'
    },

    autoImport: {
      webpack: {
        plugins: [new HokuleaAssetLoaderWebpackPlugin() /* ... */]
      }
    },
  };

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    // ..
    packagerOptions: {
      webpackConfig: {
        plugins: [theemoPlugin(), new HokuleaAssetLoaderWebpackPlugin()],
      }
    }
  };
});
```
