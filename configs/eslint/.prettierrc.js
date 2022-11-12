'use strict';

// this is a cyclic dependency, so let's gonna hardcode the import to the
// sibling directory and evict the dependency
// I gonna burn in hell for this :evil:
//module.exports = require('@hokulea/config-prettier');

module.exports = require('../prettier');
