const Plugin = require('ember-css-modules/lib/plugin');
const { ModulesMap } = require('./config');
const { getDependencies } = require('.');

class HokuleaCssModulesPlugin extends Plugin {
  virtualModules = {};

  constructor(parent) {
    super(parent);

    const app = this.isForAddon() ? parent.parent : parent;

    this.buildVirtualModules(app);
  }

  buildVirtualModules(app) {
    const dependencies = getDependencies(app.pkg);
    let modules = {};

    for (const dep of dependencies) {
      if (ModulesMap[dep]) {
        modules = { ...modules, ...ModulesMap[dep] };
      }
    }

    const virtualModules = {};

    for (const [css, js] of Object.entries(modules)) {
      virtualModules[css] = require(require.resolve(js, {
        paths: [app.root]
      }));
    }

    this.virtualModules = virtualModules;
  }

  config() {
    console.log('virtualModules', this.virtualModules);

    return { virtualModules: this.virtualModules };
  }
}

module.exports = { HokuleaCssModulesPlugin };
