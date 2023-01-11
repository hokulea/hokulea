const AssetMap = {
  '@hokulea/foundation': ['@hokulea/foundation/dist/styles.css'],
  '@hokulea/layouts': ['@hokulea/layouts/dist/styles.css'],
  '@hokulea/ember-actions': ['@hokulea/ember-actions/dist/styles.css']
};

const ModulesMap = {
  '@hokulea/actions': {
    '@hokulea/actions/button.css': '@hokulea/actions/button.js'
  },
  '@hokulea/foundation': {
    '@hokulea/foundation/tiles.css': '@hokulea/foundation/tiles.js'
  },
  '@hokulea/layouts': {
    '@hokulea/layouts/flow.css': '@hokulea/layouts/flow.js'
  }
};

module.exports = {
  AssetMap,
  ModulesMap
};
