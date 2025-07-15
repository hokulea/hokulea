import path from 'node:path';

import Case from 'case';
// @ts-expect-error its a js file
import emberTemplateCompiler from 'ember-source/dist/ember-template-compiler.js';

// @ts-expect-error its a js file
import markdownCompilerConfig from './config/md-compiler.js';
// @ts-expect-error its a js file
import hbsBabelLoader from './loader/hbs-loader.js';

import type { StorybookConfig } from '@storybook/ember';
import type { RuleSetRule } from 'webpack';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const precompile = emberTemplateCompiler.precompile;

const config: StorybookConfig = {
  // stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  stories: [
    '../app/**/*.stories.ts',
    '../../documentation/**/*.md',
    // '../../api/*.md',
    '../../ember/package/src/**/*.stories.ts'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-designs', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/ember',
    options: {}
  },
  core: {
    disableWhatsNewNotifications: true
  },
  docs: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    autodocs: 'tag'
  },
  staticDirs: ['../dist'],
  babel: (options: Record<string, unknown>) => ({
    ...options,
    presets: [['@babel/preset-typescript']],
    plugins: [
      [
        import.meta.resolve('babel-plugin-htmlbars-inline-precompile'),
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  experimental_indexers: (existingIndexers) => {
    const docIndexer = {
      test: /\/documentation\/.*\.md$/,
      createIndex: (fileName: string) => {
        const nav = path
          .relative(path.resolve(import.meta.dirname, '../../documentation'), fileName)
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
  // eslint-disable-next-line @typescript-eslint/no-shadow
  webpack: (config) => {
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
          loader: path.resolve(import.meta.dirname, 'loader/doc-loader'),
          options: {
            root: 'Documentation',
            dir: path.resolve(import.meta.dirname, '../../documentation'),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            compiler: markdownCompilerConfig
          }
        }
      ]
    });

    return config;
  }
};

export default config;
