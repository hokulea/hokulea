'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'CSR',
        npm: {
          devDependencies: {
            'ember-cli-fastboot': null
          }
        }
      },
      {
        name: 'SSR'
      },
      {
        name: 'ember-release',
        command: 'pnpm _syncPnpm; ember test --reporter xunit',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          },
          dependenciesMeta: {
            '@hokulea/ember': {
              injected: true
            }
          }
        }
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta')
          },
          dependenciesMeta: {
            '@hokulea/ember': {
              injected: true
            }
          }
        }
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary')
          },
          dependenciesMeta: {
            '@hokulea/ember': {
              injected: true
            }
          }
        }
      },
      embroiderSafe(),
      embroiderOptimized()
    ]
  };
};
