import { defineConfig } from '@theemo/cli';
import { figmaReader, getNameFromStyle, isTokenByVariable, theemoPlugin } from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';

const { FIGMA_SECRET, DEV } = process.env;

const NESTED_TOPICS = new Set(['intents', 'indicators']);
const DYNAMIC = [
  's-4',
  's-3',
  's-2',
  's-1',
  's0',
  's1',
  's2',
  's3',
  's4',
  'ls-4',
  'ls-3',
  'ls-2',
  'ls-1',
  'ls0',
  'ls1',
  'ls2',
  'ls3',
  'ls4',
  'spacing.primitive-4',
  'spacing.primitive-3',
  'spacing.primitive-2',
  'spacing.primitive-1',
  'spacing.primitive0',
  'spacing.primitive1',
  'spacing.primitive2',
  'spacing.primitive3',
  'spacing.primitive4',
  'spacing.container-4',
  'spacing.container-3',
  'spacing.container-2',
  'spacing.container-1',
  'spacing.container0',
  'spacing.container1',
  'spacing.container2',
  'spacing.container3',
  'spacing.container4'
];

function cleanTopic(topic) {
  if (topic) {
    return topic.replace(/\s+\(.*\)/, '');
  }
}

function normalizeNumericValue(value) {
  if (Array.isArray(value)) {
    return value.map((contraint) => ({
      ...contraint,
      value: normalizeNumericValue(contraint.value)
    }));
  }

  if (typeof value === 'number') {
    return parseFloat(parseFloat(value).toFixed(2));
  }

  return value;
}

export function theemoConfig(figmaFileIds) {
  return defineConfig({
    sync: {
      reader: {
        sources: figmaReader({
          secret: FIGMA_SECRET,

          files: figmaFileIds,

          plugins: [theemoPlugin()],

          parser: {
            considerMode(mode) {
              return ['light', 'dark', 'comfortable', 'spacious', 'compact'].includes(mode);
            },

            getConstraints(mode) {
              if (['light', 'dark'].includes(mode)) {
                return { features: { 'color-scheme': mode } };
              }

              if (['comfortable', 'spacious', 'compact'].includes(mode)) {
                return { features: { density: mode } };
              }
            },

            isTokenByVariable(variable) {
              return DEV ? true : isTokenByVariable(variable);
            },

            getNameFromStyle(style) {
              if (style.styleType === 'TEXT') {
                return getNameFromStyle({
                  ...style,
                  name: `typography/${style.name}`
                });
              }

              return getNameFromStyle(style);
            },

            isTokenByStyle(style) {
              return style.styleType === 'TEXT' || style.styleType === 'EFFECT';
            },

            getPropertiesForToken(token) {
              let dynamics = {};

              if (DYNAMIC.includes(token.name)) {
                dynamics = {
                  dynamic: true
                };
              }

              let topic = '';

              if (token.figma.variable) {
                topic = cleanTopic(token.figma.variable.collection.name.toLowerCase());
              } else if (token.figma.style) {
                topic = token.name.split('.')[0];
                topic = topic === 'shape' ? 'shapes' : topic;
              }

              return {
                ...dynamics,
                topic
              };
            }
          }
        })
      },

      lexer: {
        normalizeToken(token) {
          if (
            [
              'control.border-width',
              'control.focus.stroke-offset',
              'control.focus.stroke-width'
            ].includes(token.name)
          ) {
            return {
              ...token,
              value: `${token.value[0].value}px`,
              type: 'dimension'
            };
          }

          if (['shape.stroke.width'].includes(token.name)) {
            return {
              ...token,
              value: `${token.value}px`,
              type: 'dimension'
            };
          }

          // merge constrained values, because Figma can't
          if (token.topic === 'controls' && token.type !== 'color') {
            return {
              ...token,
              value: token.value[0].value
            };
          }

          if (token.type === 'number') {
            return {
              ...token,
              value: normalizeNumericValue(token.value)
            };
          }

          return token;
        }
      },

      writer: {
        targets: styleDictionaryWriter({
          pathForToken(token) {
            return token.name.split('.');
          },

          fileForToken(token) {
            let fileName = token.topic;

            if (NESTED_TOPICS.has(token.topic)) {
              const parts = token.name.split('.');

              fileName += `/${parts[1]}`;
            }

            return fileName;
          },

          dataForToken(token) {
            return {
              dynamic: token.dynamic
            };
          }
        })
      }
    },

    build: {
      outDir: 'dist',
      files: ['build/properties.css', 'build/vars.css'],
      features: [
        {
          name: 'color-scheme',
          browserFeature: 'color-scheme',
          options: ['light', 'dark']
        },
        {
          name: 'density',
          options: {
            compact: 'build/density-compact.css',
            comfortable: 'build/density-comfortable.css',
            spacious: 'build/density-spacious.css'
          },
          defaultOption: 'comfortable'
        }
      ]
    }
  });
}
