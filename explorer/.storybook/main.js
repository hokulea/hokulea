// const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");
const path = require('path');
const { precompile } = require('ember-source/dist/ember-template-compiler');

module.exports = {
  stories: ['../stories/*.md', '../../packages/**/stor(y|ies).ts'],
  addons: [
    "@storybook/addon-knobs/register",
    "storybook-addon-designs/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-docs/register",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/stor(y|ies)\.ts$/],
          include: [
            path.resolve(__dirname, '../../packages')
          ]
        }
      }
    }
  ],
  webpack: async config => {
    // remove sb *.md loader
    for (const rule of config.module.rules) {
      if (rule.test.toString().includes('md')) {
        config.module.rules.splice(config.module.rules.indexOf(rule), 1);
      }
    }

    config.module.rules.push({
      test: /stories\/.+\.md$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                require.resolve('babel-plugin-htmlbars-inline-precompile'),
                {
                  precompile,
                  modules: {
                    'ember-cli-htmlbars': 'hbs',
                    'ember-cli-htmlbars-inline-precompile': 'default',
                    'htmlbars-inline-precompile': 'default',
                  }
                }
              ]
            ]
          }
        },
        {
          loader: path.resolve(__dirname, 'doc-loader'),
          options: {
            compiler: {
              plugins: [
                'markdown-it-abbr',
                'markdown-it-anchor',
                'markdown-it-deflist',
                'markdown-it-highlightjs',
                'markdown-it-ins',
                'markdown-it-mark',
                'markdown-it-sub',
                'markdown-it-sup'
              ],
              format(doc) {
                return `<Page @title="${doc.attributes.title}">${doc.html}</Page>`;
              }
            }
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
              [
                require.resolve('babel-plugin-htmlbars-inline-precompile'),
                {
                  precompile,
                  modules: {
                    'ember-cli-htmlbars': 'hbs',
                    'ember-cli-htmlbars-inline-precompile': 'default',
                    'htmlbars-inline-precompile': 'default',
                  }
                }
              ]
            ]
          }
        }
      ],
    });

    config.resolve.extensions.push('.ts');
    // config.module.rules.push({
    //   test: /stories\/.+\.js?$/,
    //   loader: require.resolve("@storybook/source-loader"),
    //   exclude: [/node_modules/],
    //   enforce: "pre"
    // });
    return config;
  }
};
