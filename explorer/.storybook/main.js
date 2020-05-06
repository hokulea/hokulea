const path = require('path');
const { precompile } = require('ember-source/dist/ember-template-compiler');

module.exports = {
  stories: ['../../documentation/**/*.md', '../../packages/**/stories.ts'],
  addons: [
    "@storybook/addon-knobs",
    "storybook-addon-designs",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
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
    // remove storybook *.md loader
    for (const rule of config.module.rules) {
      if (rule.test.toString().includes('md')) {
        config.module.rules.splice(config.module.rules.indexOf(rule), 1);
      }
    }

    config.module.rules.push({
      test: /\.md$/,
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
            root: 'Documentation',
            dir: path.resolve(__dirname, '../../documentation'),
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
                const title = doc.attributes.title
                  ? doc.attributes.title
                  : doc.toc && doc.toc.length > 0 ? doc.toc[0].content : '';

                // strip first <h1> off of html
                if (!doc.attributes.title) {
                  doc.html = doc.html.replace(/<h1(.+)>(.+)<\/h1>/, '');
                }

                return `<Page @title="${title}">${doc.html}</Page>`;
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
    return config;
  }
};
