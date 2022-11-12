// Copied from
// https://github.com/madyankin/postcss-modules/blob/master/src/css-loader-core/loader.js

const fs = require('fs');
const path = require('path');
const process = require('process');
const postcss = require('postcss');
const Parser = require('./parser');

class Core {
  constructor(plugins) {
    this.plugins = plugins || Core.defaultPlugins;
  }

  load(sourceString, sourcePath, trace, pathFetcher) {
    let parser = new Parser(pathFetcher, trace);

    return postcss(this.plugins.concat([parser.plugin()]))
      .process(sourceString, { from: sourcePath })
      .then((result) => {
        return {
          injectableSource: result.css,
          exportTokens: parser.exportTokens
        };
      });
  }
}

// Sorts dependencies in the following way:
// AAA comes before AA and A
// AB comes after AA and before A
// All Bs come after all As
// This ensures that the files are always returned in the following order:
// - In the order they were required, except
// - After all their dependencies
const traceKeySorter = (a, b) => {
  if (a.length < b.length) {
    return a < b.substring(0, a.length) ? -1 : 1;
  } else if (a.length > b.length) {
    return a.substring(0, b.length) <= b ? -1 : 1;
  } else {
    return a < b ? -1 : 1;
  }
};

module.exports = class FileSystemLoader {
  constructor(root, plugins) {
    if (root === '/' && process.platform === 'win32') {
      const cwdDrive = process.cwd().slice(0, 3);

      if (!/^[A-Z]:\\$/.test(cwdDrive)) {
        throw new Error(`Failed to obtain root from "${process.cwd()}".`);
      }

      root = cwdDrive;
    }

    this.root = root;
    this.sources = {};
    this.traces = {};
    this.importNr = 0;
    this.core = new Core(plugins);
    this.tokensByFile = {};
  }

  fetch(_newPath, relativeTo, _trace) {
    let newPath = _newPath.replace(/^["']|["']$/g, ''),
      trace = _trace || String.fromCharCode(this.importNr++);

    return new Promise((resolve, reject) => {
      const relativeDir = path.dirname(relativeTo);
      const rootRelativePath = path.resolve(relativeDir, newPath);
      let fileRelativePath;

      // if the path is not relative or absolute, try to resolve it in node_modules
      if (newPath[0] !== '.' && !path.isAbsolute(newPath)) {
        const origPaths = require.resolve.paths(newPath);
        const newPaths = [];
        let cwd = process.cwd();

        do {
          const candidate = path.join(cwd, 'node_modules');

          if (!origPaths.includes(candidate)) {
            newPaths.push(candidate);
          }

          cwd = path.dirname(cwd);
        } while (
          // I dunno, if this will break in windows ?
          cwd !== path.dirname(cwd)
        );

        const paths = [...newPaths, ...origPaths];

        try {
          fileRelativePath = require.resolve(newPath, {
            paths
          });
        } catch (e) {
          // noop
        }
      }

      // fall back to resolve it based on file system
      if (!fileRelativePath) {
        fileRelativePath = path.resolve(path.resolve(this.root, relativeDir), newPath);
      }

      const tokens = this.tokensByFile[fileRelativePath];

      if (tokens) {
        return resolve(tokens);
      }

      fs.readFile(fileRelativePath, 'utf-8', (err, source) => {
        if (err) reject(err);
        this.core
          .load(source, rootRelativePath, trace, this.fetch.bind(this))
          .then(({ injectableSource, exportTokens }) => {
            this.sources[fileRelativePath] = injectableSource;
            this.traces[trace] = fileRelativePath;
            this.tokensByFile[fileRelativePath] = exportTokens;
            resolve(exportTokens);
          }, reject);
      });
    });
  }

  get finalSource() {
    const traces = this.traces;
    const sources = this.sources;
    let written = new Set();

    return Object.keys(traces)
      .sort(traceKeySorter)
      .map((key) => {
        const filename = traces[key];

        if (written.has(filename)) {
          return null;
        }

        written.add(filename);

        return sources[filename];
      })
      .join('');
  }
};
