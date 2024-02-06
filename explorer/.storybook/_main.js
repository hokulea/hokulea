/* eslint-disable */
const path = require('path');

const { precompile } = require('ember-source/dist/ember-template-compiler');
const markdownCompilerConfig = require('./config/md-compiler');
const hbsBabelLoader = require('./loader/hbs-loader');

module.exports = {
  core: {
    builder: 'webpack5'
  },
  staticDirs: ['../dist'],
  stories: [
    '../app/**/*.stories.ts',
    '../../documentation/**/*.md',
    // '../../api/*.md',
    '../../ember/package/src/**/*.stories.ts'
  ],
  framework: '@storybook/ember',
  features: {
    babelModeV7: true,
    buildStoriesJson: true
  },
  babel: async (options) => ({
    ...options,
    presets: [['@babel/preset-typescript']],
    plugins: [
      [
        // eslint-disable-next-line n/no-missing-require
        require.resolve('babel-plugin-htmlbars-inline-precompile'),
        {
          precompile,
          modules: {
            'ember-cli-htmlbars': 'hbs',
            'ember-cli-htmlbars-inline-precompile': 'default',
            'htmlbars-inline-precompile': 'default'
          }
        }
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties'
    ]
  }),
  addons: [
    '@storybook/addon-controls',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/stor(y|ies)\.ts$/],
          include: [path.resolve(__dirname, '../../packages')]
        }
      }
    },
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport'
  ],
  webpack: async (config) => {
    // remove storybook *.md loader
    for (const rule of config.module.rules) {
      if (rule.test.toString().includes('md')) {
        config.module.rules.splice(config.module.rules.indexOf(rule), 1);
      }
    }

    config.module.rules.push({
      test: /documentation\/.+\.md$/,
      use: [
        hbsBabelLoader,
        {
          loader: path.resolve(__dirname, 'loader/doc-loader'),
          options: {
            root: 'Documentation',
            dir: path.resolve(__dirname, '../../documentation'),
            compiler: markdownCompilerConfig
          }
        }
      ]
    });

    config.module.rules.push(
      {
        test: /api\/.+\.md$/,
        use: [
          hbsBabelLoader,
          {
            loader: path.resolve(__dirname, 'loader/api-loader'),
            options: {
              root: 'API',
              dir: path.resolve(__dirname, '../../api'),
              compiler: markdownCompilerConfig
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [hbsBabelLoader]
      }
    );

    return config;
  }
};
