import {
  figmaReader,
  getNameFromStyle,
  theemoPlugin,
  getNameFromVariable
} from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';
import inflection from 'inflection';

const { FIGMA_SECRET } = process.env;

const NESTED_TOPICS = ['intents', 'indicators'];
const TOPICS = ['shape', 'sizing'];
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

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        secret: FIGMA_SECRET,

        files: ['7RU8ZBdMmrhvLSmrcbi8PH'],

        plugins: [theemoPlugin()],

        parser: {
          getNameFromVariable(variable) {
            if (
              variable.name.toLowerCase().startsWith('global/') ||
              variable.name.toLowerCase().startsWith('local/')
            ) {
              return variable.name
                .toLowerCase()
                .replace('global/', '')
                .replace('local/', '');
            }

            if (
              TOPICS.includes(
                cleanTopic(variable.collection.name.toLowerCase())
              )
            ) {
              return `${inflection
                .singularize(cleanTopic(variable.collection.name))
                .toLowerCase()}.${getNameFromVariable(variable)}`;
            }

            return getNameFromVariable(variable);
          },

          considerMode(mode) {
            return ['light', 'dark'].includes(mode);
          },

          getConstraints(mode) {
            if (mode === 'light' || mode === 'dark') {
              return { features: { 'color-scheme': mode } };
            }
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
            // return !style.name.includes('(') && !style.name.includes(')') && isTokenByStyle(style);
          },

          getPropertiesForToken(token) {
            let dynamics = {};

            if (DYNAMIC.includes(token.name)) {
              dynamics = {
                dynamic: true
              };
            }

            return {
              ...dynamics,
              topic:
                cleanTopic(
                  token.figma.variable?.collection?.name?.toLowerCase()
                ) ?? ''
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

        // if (['sizing.factor', 'sizing.ratio'].includes(token.name)) {
        if (token.type === 'number') {
          return {
            ...token,
            value: parseFloat(parseFloat(token.value).toFixed(2))
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
          const parts = token.name.split('.');

          if (token.topic) {
            if (NESTED_TOPICS.includes(token.topic)) {
              return `${token.topic}/${parts[1]}`;
            }

            return token.topic;
          }

          let fileName = 'misc';

          if (parts.length > 1) {
            fileName = parts[0];
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
    input: 'build',
    output: 'dist',
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: false
      },
      dark: {
        auto: true,
        manual: false
        // selector: 'html[data-theme="dark"]'
      }
    }
  }
});
