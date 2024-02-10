'use strict';

// this is a cyclic dependency, so let's gonna hardcode the import to the
// sibling directory and evict the dependency
// I gonna burn in hell for this :evil:
// const { configs } = require('@hokulea/config-eslint');
const { configs } = require('../eslint');

module.exports = configs.nodeCJS();
