const { AssetMap } = require('./config');

function importAssets(app) {
  const dependencies = getDependencies(app.project.pkg);
  const assets = [];

  for (const dep of dependencies) {
    if (AssetMap[dep]) {
      assets.push(...AssetMap[dep]);
    }
  }

  for (const asset of assets) {
    app.import(`node_modules/${asset}`);
  }
}

function getDependencies(pkg) {
  return [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})].filter(
    (name) => name.startsWith('@hokulea')
  );
}

const HOKULEA_CONFIG = {
  theemo: {
    defaultTheme: 'moana'
  }
};

module.exports = {
  importAssets,
  getDependencies,
  HOKULEA_CONFIG
};
