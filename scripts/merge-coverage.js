const fs = require('fs');
const path = require('path');

const coveragePath = path.join(__dirname, '..', 'coverage');
const packagesPath = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesPath, { withFileTypes: true, encoding: 'utf-8' });

for (const package of packages) {
  if (package.isDirectory()) {
    const lcovFile = path.join(packagesPath, package.name, 'coverage', 'lcov.info');

    if (fs.existsSync(lcovFile)) {
      const targetFile = path.join(coveragePath, `${package.name}.lcov`);
      
      if (!fs.existsSync(coveragePath)) {
        fs.mkdirSync(coveragePath)
      }

      fs.copyFileSync(lcovFile, targetFile);

      let contents = fs.readFileSync(targetFile, { encoding: 'utf-8' });
      contents = contents.replace(/SF:/g, `SF:${path.join('packages', package.name)}/`);
      fs.writeFileSync(targetFile, contents);
    }
  }
}
