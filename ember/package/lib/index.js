const fs = require('node:fs');
const path = require('node:path');
const { HokuleaAssetLoaderWebpackPlugin } = require('./webpack-asset-loader-plugin');

const lucideStatic = path.dirname(path.dirname(path.dirname(require.resolve('lucide-static'))));
const HOKULEA_ICON_PATH = path.join(lucideStatic, 'icons');

function importAssets(app) {
  const paths = [
    // pnpm
    'node_modules/@hokulea/ember/node_modules/@hokulea/core/dist/index.css'
  ];

  let found = false;

  for (const stylesPath of paths) {
    if (!found && fs.existsSync(stylesPath)) {
      app.import(stylesPath);
      found = true;
    }
  }
}

const HOKULEA_CONFIG = {
  theemo: {
    defaultTheme: 'moana'
  }
};

module.exports = {
  importAssets,
  HOKULEA_CONFIG,
  HOKULEA_ICON_PATH,
  HokuleaAssetLoaderWebpackPlugin
};
