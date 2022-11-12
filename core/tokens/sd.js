const StyleDictionary = require('style-dictionary');
const base = require('@hokulea/config-style-dictionary/base');

StyleDictionary.registerFormat({
  name: 'typescript/info',
  formatter: function ({ dictionary, options }) {
    const entries = Object.fromEntries(
      dictionary.allTokens.map(function (token) {
        return [token.name, token];
      })
    );

    return `/* eslint-disable @typescript-eslint/naming-convention */
import { type Token } from './';

type Tokens = Record<string, Token>;

export const tokens: Tokens = ${JSON.stringify(entries, null, 2)}`;
  }
});

StyleDictionary.registerFormat({
  name: 'css/tokens',
  formatter: function ({ dictionary, options = {}, file }) {
    const selector = options.selector ? options.selector : `:root`;
    const { outputReferences } = options;

    return (
      StyleDictionary.formatHelpers.fileHeader({
        file,
        formatting: {
          header: `/* stylelint-disable max-line-length */\n/**\n`
        }
      }) +
      `${selector} {\n` +
      StyleDictionary.formatHelpers.formattedVariables({
        format: 'css',
        dictionary,
        outputReferences
      }) +
      `\n}\n`
    );
  }
});

const config = {
  ...base,
  source: [`node_modules/@hokulea/theme-moana/tokens/**/*.json`],
  platforms: {
    web: {
      ...base.platforms.web,
      buildPath: './src/',
      files: [
        {
          format: 'css/tokens',
          destination: 'tokens.css',
          options: {
            outputReferences: true,
            fileHeader() {
              return [
                'Auto-generated Tokens',
                'DO NOT USE THEM! -> Use a theme instead',
                'They are for IDE completion and documentation purpose'
              ];
            }
          }
        },
        {
          format: 'typescript/info',
          destination: 'tokens.ts'
        }
      ]
    }
  }
};

module.exports = config;
