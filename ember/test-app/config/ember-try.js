/* eslint-disable unicorn/prefer-module */
'use strict';

// eslint-disable-next-line unicorn/no-anonymous-default-export
module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'CSR',
        npm: {
          devDependencies: {
            'ember-cli-fastboot': undefined
          },
          dependenciesMeta: {
            '@hokulea/ember': {
              injected: true
            }
          }
        }
      },
      {
        name: 'SSR',
        npm: {
          dependenciesMeta: {
            '@hokulea/ember': {
              injected: true
            }
          }
        }
      }
    ]
  };
};
