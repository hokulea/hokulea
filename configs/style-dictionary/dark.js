const base = require('./base');

const config = {
  ...base,
  include: [`tokens/**/!(*.${base.modes.join(`|*.`)}).json`],
  source: [`tokens/**/*.dark.json`]
};

config.platforms.web.files = [
  {
    format: 'css/variables',
    destination: 'dark.css',
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    filter(token) {
      return token.colorScheme === 'dark';
    }
  }
];

module.exports = config;
