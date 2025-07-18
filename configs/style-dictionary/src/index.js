import StyleDictionary from 'style-dictionary';

import {
  isConstrainedByPlatform,
  isConstrainedToken,
  isCSSProperty,
  matchesConstraints,
  registerTheemo
} from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

function isDynamicToken(token) {
  return token.dynamic === true;
}

function makeDensityPlatform(density) {
  return {
    transformGroup: 'theemo',
    buildPath: 'build/',
    constraints: {
      features: {
        density: density
      }
    },
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    files: [
      {
        format: 'css/variables',
        destination: `density-${density}.css`,
        filter: isConstrainedByPlatform
      }
    ]
  };
}

/** @type import("style-dictionary/types").Config */
export default {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token'],
  platforms: {
    css: {
      transformGroup: 'theemo',
      buildPath: 'build/',
      options: {
        outputReferences: true,
        showFileHeader: false,
        useCSSColorTransform: true
      },
      files: [
        {
          format: 'css/properties',
          destination: 'properties.css',
          filter: (token) => isCSSProperty(token) && !isDynamicToken(token)
        },
        {
          format: 'css/variables',
          destination: 'vars.css',
          filter: (token) =>
            // when no CSS property
            !isCSSProperty(token) &&
            // no dynamic token
            !isDynamicToken(token) &&
            // and matches color-scheme constraint
            (matchesConstraints(token, {
              features: {
                'color-scheme': ['light', 'dark']
              }
            }) ||
              // but no other constraint
              !isConstrainedToken(token))
        }
      ]
    },
    // constrained tokens (to combine them later under given selectors)
    'density-comfortable': makeDensityPlatform('comfortable'),
    'density-spacious': makeDensityPlatform('spacious'),
    'density-compact': makeDensityPlatform('compact')
  }
};
