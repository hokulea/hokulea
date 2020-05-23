const Plugin = require('ember-css-modules/lib/plugin');

module.exports = class HokuleaPlugin extends Plugin {
  get project() {
    let project = this.parent;
    while (project.parent) {
      project = project.parent;
    }

    return project;
  }

  get browsers() {
    return (this.project.targets && this.project.targets.browsers) || null;
  }

  config(environment, baseConfig) {
    const before = [
      // https://github.com/postcss/postcss-nested
      // Nest rules and reference the parent via &
      require('postcss-nested')
    ];
    const after = [
      // https://github.com/csstools/postcss-preset-env
      // Adds vendor prefixes based on Can I Use and polyfills new features
      // Inspired by https://github.com/moxystudio/postcss-preset-moxy/blob/master/index.js
      require('postcss-preset-env')({
        browsers: this.browsers,

        // https://cssdb.org/
        stage: 4,

        // Disable `preserve` so that the resulting CSS is consistent among all
        // browsers, diminishing the probability of discovering bugs only when
        // testing in older browsers.
        preserve: false,

        // Explicitly enable features that we want, despite being proposals yet.
        // features: {
        //   'custom-properties': true,
        //   'custom-media-queries': true,
        //   'nesting-rules': true,
        //   'pseudo-class-any-link': true
        // },

        autoprefixer: {
          // We don't manually apply prefixes unless they are really necessary,
          // e.g.when dealing with quirks, therefore we disable removing them.
          remove: false
        }
      })
    ];

    for (const [stage, plugins] of Object.entries({ before, after })) {
      this.addPostcssPlugin(baseConfig, stage, ...plugins);
    }

    return {};
  }
};
