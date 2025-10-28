import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';

import { bundle, Features } from 'lightningcss';

const config = {
  input: join(process.cwd(), 'src', 'index.css'),
  output: join(process.cwd(), 'dist', 'style.css')
};

const mixins = new Map();

function applyMixin(name) {
  if (mixins.has(name)) {
    return mixins.get(name);
  } else {
    console.warn(`Unknown Mixin: '${name}'`);
  }

  return [];
}

const { code } = bundle({
  filename: config.input,
  minify: false, // the explorer with auto-import errors on reading the minified file
  exclude: Features.Nesting,
  customAtRules: {
    mixin: {
      prelude: '<custom-ident>',
      body: 'style-block'
    },
    apply: {
      prelude: '<custom-ident>'
    }
  },
  visitor: {
    Rule: {
      custom: {
        mixin(rule) {
          // recursively resolve `@apply`
          const value = rule.body.value.flatMap((r) =>
            r.type === 'custom' && r.value.name === 'apply' ? applyMixin(r.value.prelude.value) : r
          );

          mixins.set(rule.prelude.value, value);

          return [];
        },
        apply(rule) {
          return applyMixin(rule.prelude.value);
        }
      }
    }
  }
});

const outDir = dirname(config.output);

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

writeFileSync(config.output, code);
