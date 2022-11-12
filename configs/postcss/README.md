# `@hokulea/config-postcss`

Add eslint to your packages.

## Installation

1) Install these packages:

```sh
pnpm add -D postcss @parcel/css
```

Plus this config:

```json
{
  "devDependencies": {
    "@hokulea/config-postcss": "*"
  }
}
```

2) Use in rollup:

```js
import postcss from 'rollup-plugin-postcss'
import { rollup as postcssRollup } from '@hokulea/config-postcss';

postcss(postcssRollup({ minify: production }))
```
