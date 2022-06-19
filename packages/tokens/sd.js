const StyleDictionary = require('style-dictionary');
const base = require('../../configs/style-dictionary.base');

StyleDictionary.registerFormat({
  name: 'javascript/info',
  formatter: function({ dictionary, options }) {
    const entries = Object.fromEntries(dictionary.allTokens.map(function(token) {
      return [token.name, token];
    }));

    return `module.exports = ${JSON.stringify(entries, null, 2)}`;
  }
});

const config = {
  ...base,
  source: [`tokens/**/!(*.${base.modes.join(`|*.`)}).json`],
  platforms: {
    web: {
      ...base.platforms.web,
      buildPath: './',
      files:  [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          }
        },
        {
          format: 'javascript/info',
          destination: 'tokens.js'
        }
      ]
    }
  }
};

module.exports = config;
