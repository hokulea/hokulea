# `@hokulea/config-stylelint`

Adds stylelint to your packages.

## Installation

1) Install these packages:

```sh
pnpm add -D stylelint
```

Plus this config:

```json
{
  "devDependencies": {
    "@hokulea/config-stylelint": "*"
  }
}
```

2) Create a `.stylelintrc.js` file with these contents:

```js
'use strict';

module.exports = require('@hokulea/config-stylelint');
```

3) Add scripts to execute linting

```json
{
  "scripts": {
    "lint:css": "stylelint \"src/**/*.css\" --allow-empty-input --cache",
    "lint:css:fix": "stylelint \"src/**/*.css\" --allow-empty-input --fix",
  }
}
```
