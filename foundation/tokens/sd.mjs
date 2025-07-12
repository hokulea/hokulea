import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

import {
  isConstrainedByPlatform,
  isConstrainedToken,
  registerTheemo
} from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

function filterTokenProperties(token) {
  return {
    name: token.name,
    description: token.description,
    value: token.value,
    type: token.type,
    figmaName: token.figmaName
  };
}

StyleDictionary.registerFormat({
  name: 'typescript/info',
  format: function ({ dictionary }) {
    const entries = Object.fromEntries(
      dictionary.allTokens.map(filterTokenProperties).map(function (token) {
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
  format: function ({ dictionary, options = {}, file }) {
    const selector = options.selector ?? `:root`;
    const { outputReferences } = options;

    return (
      fileHeader({
        file,
        formatting: {
          header: `/* stylelint-disable max-line-length */\n/**\n`
        },
        options
      }) +
      `${selector} {\n` +
      formattedVariables({
        format: 'css',
        dictionary,
        outputReferences
      }) +
      `\n}\n`
    );
  }
});

export default {
  source: [`node_modules/@hokulea/theme-moana/tokens/**/*.json`],
  preprocessors: ['theemo/token'],
  platforms: {
    web: {
      transformGroup: 'theemo',
      buildPath: './src/',
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      options: {
        useCSSColorTransform: false
      },
      files: [
        {
          format: 'css/variables',
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
          },
          filter: (token) => {
            return !isConstrainedToken(token) || isConstrainedByPlatform(token);
          }
        },
        {
          format: 'typescript/info',
          destination: 'tokens.ts',
          filter: isConstrainedByPlatform
        }
      ]
    }
  }
};
