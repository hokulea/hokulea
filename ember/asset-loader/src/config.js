const AssetMap = {
  '@hokulea/foundation': ['@hokulea/foundation/dist/index.css'],
  '@hokulea/layouts': ['@hokulea/layouts/dist/index.css'],
  '@hokulea/ember-foundation': ['@hokulea/ember-foundation/dist/index.css'],
  '@hokulea/ember-actions': ['@hokulea/ember-actions/dist/index.css']
};

const ModulesMap = {
  '@hokulea/actions': {
    '@hokulea/actions/button.css': '@hokulea/actions/button.js'
  },
  '@hokulea/layouts': {
    '@hokulea/layouts/flow.css': '@hokulea/layouts/flow.js'
  }
};

module.exports = {
  AssetMap,
  ModulesMap
};
