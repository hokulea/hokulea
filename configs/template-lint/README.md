# `@hokulea/config-template-lint`

Add template-lint to your packages.

## Installation

1) Install these packages:

```sh
pnpm add -D ember-template-lint
```

Plus this config:

```json
{
  "devDependencies": {
    "@hokulea/config-template-lint": "*"
  }
}
```

2) Create a `.template-lintrc.js` file with these contents:

```js
'use strict';

module.exports = require('@hokulea/config-template-lint');
```

3) Add scripts to execute linting

```json
{
  "scripts": {
    "lint:hbs": "ember-template-lint . --no-error-on-unmatched-pattern",
    "lint:hbs:fix": "ember-template-lint . --fix --no-error-on-unmatched-pattern"
  }
}
```
