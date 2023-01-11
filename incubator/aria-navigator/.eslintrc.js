'use strict';

const { configs } = require('@gossi/config-eslint');

// const ts = configs.nodeTS();
// const base = configs.nodeCJS();

// delete ts.root;

// module.exports = {
//   ...base,
//   overrides: [
//     ...base.overrides,
//     {
//       ...ts,
//       files: ['src/**/*.ts']
//     }
//   ]
// };

module.exports = configs.nodeTS();
