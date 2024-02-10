const { dirname } = require('node:path');
const readPkgUp = require('read-pkg-up');

async function isPartOfHokulea(filepath) {
  const { packageJson } = await readPkgUp({ cwd: dirname(filepath) });

  return packageJson.name.includes('@hokulea');
}

class HokuleaAssetLoaderWebpackPlugin {
  apply(compiler) {
    compiler.options?.module?.rules?.push({
      test: /.svg$/,
      include: isPartOfHokulea,
      type: 'asset/resource',
      generator: {
        filename: 'hokulea/[hash][ext][query]'
      }
    });
  }
}

module.exports = { HokuleaAssetLoaderWebpackPlugin };
