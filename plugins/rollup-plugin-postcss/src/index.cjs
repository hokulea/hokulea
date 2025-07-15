const path = require('node:path');
const { Buffer } = require('node:buffer');
const Concat = require('concat-with-sourcemaps');
const postcss = require('postcss');
const loadPostcssConfig = require('postcss-load-config');
const cssModules = require('postcss-modules');

// eslint-disable-next-line unicorn/no-anonymous-default-export
module.exports = (options = {}) => {
  const extracted = new Map();
  const sourceMap = options.sourceMap ?? false; // or 'inline'
  const minify = options.minify ?? false;
  const targets = options.targets ?? undefined;
  const output = options.output ?? undefined;

  return {
    name: '@hokulea/rollup-plugin-postcss',

    /**
     * Transforms a CSS file into a module using the PostCSS config of the
     * current project.
     */
    async transform(code, id) {
      if (!id.endsWith('css')) {
        return;
      }

      let modulesExported;

      //
      // 1. Configure PostCSS with CSS Modules
      // --------------------------------------

      const postcssConfig = await loadPostcssConfig();

      const postcssOptions = {
        ...postcssConfig.options,
        map: {
          annotation: false,
          inline: sourceMap === 'inline'
        },

        // set `from` and `to` to properly generate sourcemaps
        from: id,
        to: id
      };

      const modulesOptions = options.modules ?? {};
      const postcssModules = cssModules({
        ...modulesOptions,

        localsConvention: 'camelCase',
        // localsConvention: 'camelCaseOnly',

        // resolve imports from packages
        resolve: function (file, importer) {
          if (file[0] !== '.' && !path.isAbsolute(file)) {
            try {
              // collect paths to resolve the file in
              const origPaths = require.resolve.paths(file);
              const newPaths = [];
              let cwd = path.dirname(importer);

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
              const fileRelativePath = require.resolve(file, {
                paths
              });

              return fileRelativePath;
            } catch {
              console.warn(`Could not resolve import "${file}" from "${importer}"`);
            }
          }
        },
        getJSON(filepath, json, outpath) {
          modulesExported = json;

          if (typeof modulesOptions.getJSON === 'function') {
            return modulesOptions.getJSON(filepath, json, outpath);
          }
        }
      });

      const plugins = postcssConfig.plugins;

      // `postcss-modules`
      let cssModulesPosition = plugins.findIndex((plugin) => plugin == cssModules);

      if (cssModulesPosition === -1) {
        // do nothing here, huh?
        plugins.push(postcssModules);
      } else {
        plugins[cssModulesPosition] = postcssModules;
      }

      // `postcss-import`
      if (!plugins.includes(require('postcss-import'))) {
        plugins.unshift(require('postcss-import'));
      }

      //
      // 2. Run PostCSS and handle result
      // --------------------------------------

      const result = await postcss(plugins).process(code, postcssOptions);

      // watch dependencies
      for (const message of result.messages) {
        if (message.type === 'dependency') {
          this.addWatchFile(message.file);
        }
      }

      // warnings
      for (const warning of result.warnings()) {
        if (!warning.message) {
          warning.message = warning.text;
        }

        this.warn(warning);
      }

      const outputMap = result.map && JSON.parse(result.map.toString());
      // if (outputMap && outputMap.sources) {
      //   outputMap.sources = outputMap.sources.map(v => normalizePath(v))
      // }

      //
      // 3. Postprocess the result
      // --------------------------------------

      const output = `export default ${JSON.stringify(modulesExported)};`;

      extracted.set(id, {
        id,
        code: result.css,
        map: outputMap
      });

      return {
        code: output,
        map: result.map || { mappings: '' }
      };
    },

    /**
     * Generate a new bundle whenever a module changed.
     */
    augmentChunkHash() {
      if (extracted.size === 0) return;

      const extractedValue = Object.fromEntries([...extracted].map(([key, value]) => [key, value]));

      return JSON.stringify(extractedValue);
    },

    /**
     * Generates the final CSS bundle for the project performing two steps:
     *
     * 1. Concatenating all modules
     * 2. Postprocessing on the concatenated file to remove duplicates and other
     *    CSS optimizations with `cssnano` and `lightningcss`
     */
    async generateBundle(options_ /* , _bundle */) {
      if (extracted.size === 0 || !options_.dir || !output) {
        return;
      }

      //
      // 1. Concatenate Modules
      // --------------------------------------

      const dir = options_.dir || path.dirname(options_.file);
      const fileName = output ?? 'index.css';

      const concat = new Concat(true, fileName, '\n');
      const entries = [...extracted.values()];

      for (const result of entries) {
        const relative = path.relative(dir, result.id);
        const map = result.map || undefined;

        if (map) {
          map.file = fileName;
        }

        concat.add(relative, result.code, map);
      }

      let code = concat.content;
      let map = concat.sourceMap;

      //
      // 2. Postprocess
      // --------------------------------------

      // this.emitFile({
      //   fileName: 'index.concat.css.map',
      //   type: 'asset',
      //   source: concat.sourceMap
      // });

      const plugins = [
        require('cssnano')({
          preset: 'default'
        }),
        require('postcss-lightningcss')({
          minify,
          targets
        })
      ];

      const postcssOptions = {
        map: {
          annotation: false,
          inline: sourceMap === 'inline'
          // prev: path.join(dir, 'index.concat.css.map')
        },

        // set `from` and `to` to properly generate sourcemaps
        from: fileName,
        to: fileName
      };

      const result = await postcss(plugins).process(concat.content, postcssOptions);

      code = result.css;
      map = result.map && result.map.toString ? result.map.toString() : undefined;

      if (sourceMap === 'inline' && map) {
        const hash = Buffer.from(map).toString('base64');

        code += `\n/*# sourceMappingURL=data:application/json;base64,${hash}*/`;
      } else if (sourceMap === true) {
        code += `\n/*# sourceMappingURL=${path.basename(fileName)}.map */`;
      }

      //
      // 3. Write files
      // --------------------------------------

      if (output) {
        const codeFileName = fileName;
        const mapFileName = `${fileName}.map`;

        this.emitFile({
          fileName: codeFileName,
          type: 'asset',
          source: code
        });

        if (sourceMap === true) {
          this.emitFile({
            fileName: mapFileName,
            type: 'asset',
            source: map
          });
        }
      }
    }
  };
};
