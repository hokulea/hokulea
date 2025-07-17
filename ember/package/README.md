# Hokulea

[![Test Coverage](https://api.codeclimate.com/v1/badges/5f80d68b3b4412007423/test_coverage)](https://codeclimate.com/github/hokulea/hokulea/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5f80d68b3b4412007423/maintainability)](https://codeclimate.com/github/hokulea/hokulea/maintainability)

Welcome to **Hokulea** the whimsical _Design System_ for _Ember_.

## Installation

You need the following packages:

```sh
pnpm add -D @hokulea/core @hokulea/ember @hokulea/theme-moana
```

This will give you the hokulea core (css), the Ember API and the moana (ocean) theme.

In your `app.(t|j)s` file include the css file:

```ts
// app.(t|j)s

import '@hokulea/core/index.css';
```

## Theming

Theming will play a big role. The technical, heavy part is done - but resources
for this aren't available yet.

The theme is loaded (and managed) with [theemo](https://theemo.io). There is
theme loaders for webpack and vite.

### Vite

For vite, theemo has two packages that will take of loading and managing themes:

```sh
pnpm add -D @theemo/ember @theemo/vite
```

Then configure them in `vite.config.(m)js`:

```js
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    // ...
    theemo({
      defaultTheme: 'moana'
    })
  ]
});
```

At runtime you can use [`TheemoService` from
`@theemo/ember`](https://theemo.io/theming/integrations/ember#usage) to manage
multiple themes.

### Classic and Embroider + Webpack

Use `ember-theemo` which has all the things for webpack included:

```sh
pnpm add -D ember-theemo
```

Then configure it:

```js
// ember-cli-build.js
module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // ...
    theemo: {
      defaultTheme: 'moana'
    },
  };
```

Webpack requires a loader for the themes:

```js
const theemoPlugin = require('ember-theemo/lib/webpack');

// ember-cli-build.js
module.exports = function (defaults) {
  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    // ..
    packagerOptions: {
      webpackConfig: {
        plugins: [theemoPlugin()],
      }
    }
  };
});
```

## Icons

Hokulea is icon agnostic, it only expects you provide svg's with `currentColor`.
Meaning you can bring your own icons. Luckily there is
[Iconify](https://iconify.design/) which has build an API to access many
publicly available icons as well as supporting your own. Hokulea was build
supporting them.

You need to load them based on your bundler.

### Vite

Install:

```sh
pnpm add -D unplugin-icons
```

and then configure the plugin in your `vite.config.(m)js` file:

```js
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    // ...
    icons({
      autoInstall: true,
      compiler: 'raw',
      customCollections: {
        custom: FileSystemIconLoader('./assets/icons')
      }
    })
  ]
});
```

### Webpack

Install:

```sh
pnpm add -D unplugin-icons
```

and then configure the plugin in `ember-cli-build.js`:

```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const packageJson = require('./package');
const icons = require('unplugin-icons/webpack').default;
const { FileSystemIconLoader } = require('unplugin-icons/loaders');

const iconify = icons({
  autoInstall: true,
  compiler: 'raw',
  customCollections: {
    custom: FileSystemIconLoader('./assets/icons')
  }
});

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // ...

    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
      webpack: {
        plugins: [new GlimmerScopedCSSWebpackPlugin(), iconify]
      }
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        plugins: [iconify]
      }
    }
  });
};
```

### Classic

For classic you can use
[ember-svg-jar](https://github.com/evoactivity/ember-svg-jar) and use svg's from
there.

### Usage

Them use these icons:

```glimmer-ts
import { Icon } from '@hokulea/ember';
import Unicycle from '~icons/custom/unicycle';
import Activity from '~icons/ph/activity';

<template>
  Do some 
  <Icon @icon={{Unicycle}} />
  <Icon @icon={{Activity}} />
</template>
```

Or with svg-jar:

```hbs
Do some 
<Icon @icon={{svg-jar "unicycle"}} />
<Icon @icon={{svg-jar "activity"}} />
```
