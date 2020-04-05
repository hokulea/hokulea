module.exports = {
  sync: {
    reader: {
      source: 'figma',
      figmaFile: process.env.FIGMA_FILE,
      figmaSecret: process.env.FIGMA_SECRET,

      // referencer
      referencer: {
        type: 'figma-plugin',
        plugin: 'style-referencer',
        pluginOptions: {
          jsonbinFile: process.env.JSONBIN_FILE,
          jsonbinSecret: process.env.JSONBIN_SECRET
        }
      },

      // parser
      isTokenByStyle(style) {
        return style.name.includes('.') && style.name.includes('/');
      }
    },
  
    // lexer
    lexer: {
      classifyToken(token) {
        const t = {...token};
        t.type = t.name.startsWith('.') ? 'basic' : 'purpose';

        const contextIndex = t.name.indexOf('.$');
        if (contextIndex !== -1) {
          t.colorScheme = t.name.slice(contextIndex + 2);
          t.name = t.name.slice(0, contextIndex);
        }
        
        return t;
      },
      filterToken(token) {
        return token.type === 'purpose';
      },
      groupForToken(token) {
        return token.colorScheme ? token.colorScheme : 'base';
      }
    },

    // writer
    writer: {
      formats: {
        color: 'hex',
        colorAlpha: 'rgb',
      },

      fileForToken(token) {
        const slashIndex = token.name.indexOf('/')
        return token.name.slice(0, slashIndex).replace(/\./g, '/');
      },

      pathForToken(token) {
        const path = token.name.replace('/', '.').split('.');

        if (token.colorScheme) {
          path.push(`$${token.colorScheme}`);
        }

        return path;
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
}