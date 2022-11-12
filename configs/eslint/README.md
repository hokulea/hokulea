# `@hokulea/config-eslint`

Add eslint to your packages.

## Installation

1. Install these packages:

```sh
pnpm add -D eslint
```

Plus this config:

```json
{
  "devDependencies": {
    "@hokulea/config-eslint": "*"
  }
}
```

2. Create a `.eslintrc.js` file with these contents:

```js
"use strict";

const { configs } = require("@hokulea/config-eslint");

module.exports = configs.ember();
```

3. Add scripts to execute linting

```json
{
  "scripts": {
    "lint:js": "eslint . --cache",
    "lint:js:fix": "eslint . --fix"
  }
}
```
