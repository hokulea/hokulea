import type { StorybookConfig } from '@storybook/ember';
import { precompile } from 'ember-source/dist/ember-template-compiler';
import Case from 'case';

import type { RuleSetRule } from 'webpack';

import path from 'node:path';

import markdownCompilerConfig from './config/md-compiler';
import hbsBabelLoader from './loader/hbs-loader';

const config: StorybookConfig = {
  // stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  stories: [
    '../app/**/*.stories.ts',
    '../../documentation/**/*.md',
    // '../../api/*.md',
    '../../ember/package/src/**/*.stories.ts'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-designs'],
  framework: {
    // @ts-expect-error this _IS_ the name
    name: '@storybook/ember',
    options: {}
  },
  core: {
    disableWhatsNewNotifications: true
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../dist'],
  babel: async (options: Record<string, unknown>) => ({
    ...options,
    presets: [['@babel/preset-typescript']],
    plugins: [
      [
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
  experimental_indexers: async (existingIndexers) => {
    const docIndexer = {
      test: /\/documentation\/.*\.md$/,
      createIndex: async (fileName: string) => {
        const nav = path
          .relative(path.resolve(__dirname, '../../documentation'), fileName)
          .replace('.md', '')
          .split('/')
          .map((name) => Case.capital(name));

        return [
          {
            type: 'docs',
            importPath: fileName,
            title: `Documentation/${nav.join('/')}`,
            exportName: nav.pop() as string
            // metaId: path.dirname(path.relative(path.resolve(__dirname, '../../'), fileName))
          }
        ];
      }
    };

    return [...(existingIndexers ?? []), docIndexer];
  },
  webpack: async (config) => {
    // remove storybook *.md loader
    if (config.module?.rules) {
      for (const rule of config.module.rules) {
        if (((rule as RuleSetRule).test as RegExp).toString().includes('md')) {
          config.module.rules.splice(config.module.rules.indexOf(rule), 1);
        }
      }
    }

    config.module?.rules?.push({
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

    return config;
  }
};
export default config;
