const { /*DEV,*/ FIGMA_FILE, FIGMA_SECRET, JSONBIN_FILE, JSONBIN_SECRET } = process.env;

function pathForToken(token) {
  const name =
    token.name.startsWith('sizing') && token.computed
      ? token.name.replace('sizing.', '')
      : token.name;
  const path = name.replace(/\//g, '.').split('.');

  return path;
}

function isAmbient(token, tokens) {
  const hasColorSchemes = tokens.some((t) => t.colorScheme && t.name === token.name);
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.tier === 'purpose' && isReference;
}

function isRatioScalingToken(name) {
  return name.match(/[+/-]?\d+$/);
}

function isComputedToken(name) {
  const [, props] = name.match(/\[token(.*)]/);

  return props && props.includes('computed');
}

function isDocumentationToken(name) {
  const [, props] = name.match(/\[token(.*)]/);

  return props && props.includes('doc');
}

function normalizeName(name) {
  // lowercase all things
  let n = name.toLowerCase();

  // remove all clutter
  n = n.replace(/\s+/, '');

  // strip off private name `.` at the beginning
  n = n.replace(/^\./, '');

  // from folders to canonical name
  n = n.replace(/\//g, '.');

  // hand it back ;)
  return n;
}

function getNameFromText(node) {
  return node.name.replace(/\[token(.*)]/, '').trim();
}

const TOKENS = ['intent', 'indicator', 'surface', 'text', 'shape', 'tile', 'control'];

// for the hacks - and for migration
const COMPUTED_VALUES = {
  'sizing/s-4': '2px',
  'sizing/s-3': '4px',
  'sizing/s-2': '8px',
  'sizing/s-1': '12px',
  'sizing/s0': '16px',
  'sizing/s1': '20px',
  'sizing/s2': '24px',
  'sizing/s3': '32px',
  'sizing/s4': '48px',
  'sizing/ls-4': '2px',
  'sizing/ls-3': '4px',
  'sizing/ls-2': '8px',
  'sizing/ls-1': '12px',
  'sizing/ls0': '16px',
  'sizing/ls1': '20px',
  'sizing/ls2': '24px',
  'sizing/ls3': '32px',
  'sizing/ls4': '48px'
};

// values not synced as part of `theemo sync`
const DOC_VALUES = {
  'control/radius': 'var(--shape-radius-plain)',
  'control/padding-inline': 'var(--ls-2)',
  'control/padding-block': 'var(--ls-3)',
  'control/border-width': 'var(--shape-stroke-width)',
  'control/border-style': 'solid',
  'tile/radius': 'var(--shape-radius-subtle)',
  'tile/padding': 'var(--s0)',
  'tile/border-width': 'var(--shape-stroke-width)',
  'tile/border-style': 'solid'
};

module.exports = {
  sync: {
    reader: {
      tool: 'figma',
      figmaFile: FIGMA_FILE,
      figmaSecret: FIGMA_SECRET,

      // referencer
      referencer: {
        type: 'figma-plugin',
        plugin: 'theemo',
        pluginConfig: {
          jsonbinFile: JSONBIN_FILE,
          jsonbinSecret: JSONBIN_SECRET,
          formats: {
            color: 'hex',
            colorAlpha: 'rgb'
          }
        }
      },

      // parser
      isTokenByStyle(style) {
        return TOKENS.some((set) => style.name.startsWith(set));
        // return (
        //   (!DEV ? !style.name.startsWith('.') : true) &&
        //   (style.name.includes('.') || style.name.includes('/'))
        // );
      },

      getNameFromStyle(style) {
        if (style.styleType === 'FILL') {
          let name = normalizeName(style.name);

          // color palette names
          if (isRatioScalingToken(name)) {
            name = name.replace('..', '.').replace('.-', '-').replace('.+', '').replace('.0', '0');
          }

          // name = `${name}`.replace('color.color.', 'color.');
          return name;
        }

        return style.name;
      },

      isTokenByText(node) {
        return node.name.includes('[token');
      },

      getNameFromText(node) {
        return getNameFromText(node);
      },

      getValueFromText(node) {
        if (isComputedToken(node.name)) {
          const name = getNameFromText(node);

          if (COMPUTED_VALUES[name] !== undefined) {
            return COMPUTED_VALUES[name];
          }
        }

        if (isDocumentationToken(node.name)) {
          const name = getNameFromText(node);

          if (DOC_VALUES[name] !== undefined) {
            return DOC_VALUES[name];
          }
        }

        return node.characters;
      },

      getPropertiesForToken(token) {
        if (token.figmaName && token.style) {
          return {
            figmaName: token.figmaName
          };
        }

        // parse [token computed] here
        if (token.figmaName.includes('[token') && isComputedToken(token.figmaName)) {
          return {
            computed: true,
            description: token.node.characters
          };
        }

        if (token.figmaName.includes('[token') && isDocumentationToken(token.figmaName)) {
          return {
            documentation: true,
            description: token.node.characters
          };
        }
      }
    },

    // lexer
    lexer: {
      normalizeToken(token) {
        const normalized = { ...token };

        // normalize names
        normalized.name = normalizeName(normalized.name);

        if (normalized.reference) {
          normalized.reference = normalizeName(normalized.reference);
        }

        // normalize contexts
        const tokenContextIndex = normalized.name.indexOf('.$');

        if (tokenContextIndex !== -1) {
          normalized.colorScheme = normalized.name.slice(tokenContextIndex + 2);
          normalized.name = normalized.name.slice(0, tokenContextIndex);
        }

        return normalized;
      },

      classifyToken(token, tokens) {
        const t = { ...token };

        t.tier = token.name.startsWith('.') ? 'basic' : 'purpose';
        t.ambient = isAmbient(t, tokens.normalized);

        return t;
      }
    },

    // writer
    writer: {
      tool: 'style-dictionary',

      fileForToken(token) {
        let fileName = '';

        // 1) GET LOCATIOM

        // special cases
        // const flatFileMap = {
        //   'color.layout': 'color/layout',
        //   'color.palette': 'color/palette',
        //   'color.structure': 'color/structure',
        //   'color.text': 'color/text',
        //   structure: 'structure',
        //   scale: 'scale'
        // };

        const flatSets = ['palette', 'surface', 'shape', 'tile', 'control', 'text', 'sizing'];
        const deepSets = ['intent', 'indicator'];

        for (const set of flatSets) {
          if (token.name.startsWith(set)) {
            fileName = set;
          }
        }

        for (const name of deepSets) {
          if (token.name.startsWith(name)) {
            const sub = token.name.replace(`${name}.`, '');
            const file = sub.split('.').shift();

            fileName = `${name}/${file}`;
          }
        }

        // for (const [name, file] of Object.entries(flatFileMap)) {
        //   if (token.name.startsWith(name)) {
        //     fileName = file;
        //   }
        // }

        // if (!fileName) {
        //   for (const name of sets) {
        //     if (token.name.startsWith(name)) {
        //       const sub = token.name.replace(`${name}.`, '');
        //       const file = sub.split('.').shift();
        //       fileName = `${name.replace('.', '/')}/${file}`;
        //     }
        //   }
        // }

        if (!fileName) {
          fileName = token.name.replace('.', '/');
        }

        // 2) ADD MODIFIERS

        if (token.colorScheme) {
          fileName += `.${token.colorScheme}`;
        }

        if (token.ambient) {
          fileName += '.ambient';
        }

        if (token.computed) {
          fileName += '.computed';
        }

        if (token.documentation) {
          fileName += '.doc';
        }

        return fileName;
      },

      pathForToken(token) {
        return pathForToken(token);
      },

      valueForToken(token, tokens) {
        if (token.reference) {
          const reference = tokens.find(
            (t) => t.name === token.reference && t.colorScheme === undefined
          );

          if (reference && token.transforms === undefined) {
            return `{${pathForToken(reference).join('.')}.value}`;
          }
        }

        return token.value;
      },

      dataForToken(token) {
        return {
          figmaName: token.figmaName,
          computed: token.computed,
          documentation: token.documentation
        };
      }
    }
  },

  generate: {
    input: 'build',
    output: 'dist',
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: true
      },
      dark: {
        auto: true,
        manual: true
      }
    }
  }
};
