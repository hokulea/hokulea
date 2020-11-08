const path = require('path');
const markdownCompilerConfig = require('./config/md-compiler');
const hbsBabelLoader = require('./loader/hbs-loader');

module.exports = {
  stories: ['../../documentation/**/*.md', '../../api/*.md', '../../packages/**/stories.ts'],
  addons: [
    '@storybook/addon-knobs',
    'storybook-addon-designs',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
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

    config.module.rules.push({
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
    });

    // ref: https://github.com/storybookjs/storybook/issues/11853
    config.module.rules.push({
      test: /\.ts$/,
      use: [
        hbsBabelLoader
      ],
    });

    return config;
  }
};
