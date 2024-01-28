// eslint-disable-next-line n/no-unpublished-require
const Plugin = require('ember-css-modules/lib/plugin');
const { ModulesMap } = require('./config');
const debug = require('debug')('hokulea:css-module');

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
      } catch (_) {
        // ok, we ignore this
        console.error(_);
      }
    }

    this.virtualModules = virtualModules;
  }

  config() {
    return { virtualModules: this.virtualModules };
  }
}

module.exports = { HokuleaCssModulesPlugin };
