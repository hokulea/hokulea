/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
const Plugin = require('ember-css-modules/lib/plugin');
const debug = require('debug')('hokulea:css-module');

const ModulesMap = {
  '@hokulea/core/actions.css': '@hokulea/core/actions.module.css',
  '@hokulea/core/content.css': '@hokulea/core/content.module.css',
  '@hokulea/core/layouts.css': '@hokulea/core/layouts.module.css'
};

class HokuleaCssModulesPlugin extends Plugin {
  virtualModules = {};

  constructor(parent) {
    super(parent);

    const app = this.isForAddon() ? parent.parent : parent;

    this.buildVirtualModules(app);
  }

  buildVirtualModules(app) {
    const virtualModules = {};

    for (const [css, js] of Object.entries(ModulesMap)) {
      try {
        virtualModules[css] = require(
          require.resolve(js, {
            paths: [app.root]
          })
        );

        debug(css);
      } catch (error) {
        // ok, we ignore this
        console.error(error);
      }
    }

    this.virtualModules = virtualModules;
  }

  config() {
    return { virtualModules: this.virtualModules };
  }
}

module.exports = { HokuleaCssModulesPlugin };
