const { DEV, FIGMA_FILE, FIGMA_SECRET, JSONBIN_FILE, JSONBIN_SECRET } =
  process.env;

function pathForToken(token) {
  const name =
    token.name.startsWith('sizing') && token.computed
      ? token.name.replace('sizing.', '')
      : token.name;
  const path = name.replace(/\//g, '.').split('.');

  return path;
}

function isAmbient(token, tokens) {
  const hasColorSchemes = tokens.some(
    t => t.colorScheme && t.name === token.name
  );
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
        return (
          (!DEV ? !style.name.startsWith('.') : true) &&
          (style.name.includes('.') || style.name.includes('/'))
        );
      },

      getNameFromStyle(style) {
        if (style.styleType === 'FILL') {
          let name = normalizeName(style.name);

          // color palette names
          if (isRatioScalingToken(name)) {
            name = name
              .replace('..', '.')
              .replace('.-', '-')
              .replace('.+', '')
              .replace('.0', '0');
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
        return node.name.replace(/\[token(.*)]/, '').trim();
      },

      getValueFromText(node) {
        if (!isComputedToken(node.name)) {
          return node.characters;
        }
      },

      getPropertiesForToken(token) {
        if (token.figmaName && token.style) {
          return {
            figmaName: token.figmaName
          };
        }

        // parse [token computed] here
        if (
          token.figmaName.includes('[token') &&
          isComputedToken(token.figmaName)
        ) {
          return {
            computed: true,
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

        const flatSets = ['layout', 'palette', 'structure', 'text', 'sizing'];
        const deepSets = ['intent', 'indicator', 'emphasize'];

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

        return fileName;
      },

      pathForToken(token) {
        return pathForToken(token);
      },

      valueForToken(token, tokens) {
        if (token.reference) {
          const reference = tokens.find(
            t => t.name === token.reference && t.colorScheme === undefined
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
          computed: token.computed
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
