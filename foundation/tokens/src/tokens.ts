import { type Token } from './';

type Tokens = Record<string, Token>;

export const tokens: Tokens = {
  'control-border-color': {
    name: 'control-border-color',
    description: '',
    value: [
      {
        value: '#d4dcdf',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#37444a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-background': {
    name: 'control-background',
    description: '',
    value: [
      {
        value: '#fafbfb',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#171c1e',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-text': {
    name: 'control-text',
    description: '',
    value: [
      {
        value: 'light-dark(#0c0e10, #e9edee)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#0c0e10, #e9edee)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-placeholder': {
    name: 'control-placeholder',
    description: '',
    value: [
      {
        value: 'light-dark(#37444a, #d4dcdf)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#37444a, #d4dcdf)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-accent': {
    name: 'control-accent',
    description: '',
    value: [
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-disabled-text': {
    name: 'control-disabled-text',
    description: '',
    value: [
      {
        value: 'light-dark(#4d5f67, #9aacb3)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#4d5f67, #9aacb3)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-disabled-background': {
    name: 'control-disabled-background',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#262f32',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-hover-background': {
    name: 'control-hover-background',
    description: '',
    value: [
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#06577a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-focus-selected-background': {
    name: 'control-focus-selected-background',
    description: '',
    value: [
      {
        value: '#99e0ff',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#00364d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-focus-stroke-color': {
    name: 'control-focus-stroke-color',
    description: '',
    value: [
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-active-background': {
    name: 'control-active-background',
    description: '',
    value: [
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#054661',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'control-selected-background': {
    name: 'control-selected-background',
    description: '',
    value: [
      {
        value: '#f1f4f5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#1d2427',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-subtle-background': {
    name: 'indicator-error-subtle-background',
    description: '',
    value: [
      {
        value: '#ee9696',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ee9696',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-subtle-border': {
    name: 'indicator-error-subtle-border',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-subtle-text': {
    name: 'indicator-error-subtle-text',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#911818',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-supreme-background': {
    name: 'indicator-error-supreme-background',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-supreme-border': {
    name: 'indicator-error-supreme-border',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-supreme-text': {
    name: 'indicator-error-supreme-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-plain-border': {
    name: 'indicator-error-plain-border',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e76a6a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-error-plain-text': {
    name: 'indicator-error-plain-text',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e76a6a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-subtle-background': {
    name: 'indicator-info-subtle-background',
    description: '',
    value: [
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-subtle-border': {
    name: 'indicator-info-subtle-border',
    description: '',
    value: [
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-subtle-text': {
    name: 'indicator-info-subtle-text',
    description: '',
    value: [
      {
        value: '#054661',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#054661',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-supreme-background': {
    name: 'indicator-info-supreme-background',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#076892',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-supreme-border': {
    name: 'indicator-info-supreme-border',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#076892',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-supreme-text': {
    name: 'indicator-info-supreme-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-plain-border': {
    name: 'indicator-info-plain-border',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-info-plain-text': {
    name: 'indicator-info-plain-text',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-subtle-background': {
    name: 'indicator-success-subtle-background',
    description: '',
    value: [
      {
        value: '#abede2',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#abede2',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-subtle-border': {
    name: 'indicator-success-subtle-border',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#125449',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-subtle-text': {
    name: 'indicator-success-subtle-text',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#125449',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-supreme-background': {
    name: 'indicator-success-supreme-background',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#125449',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-supreme-border': {
    name: 'indicator-success-supreme-border',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#125449',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-supreme-text': {
    name: 'indicator-success-supreme-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-plain-border': {
    name: 'indicator-success-plain-border',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#6be0cb',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-success-plain-text': {
    name: 'indicator-success-plain-text',
    description: '',
    value: [
      {
        value: '#125449',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#6be0cb',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-subtle-background': {
    name: 'indicator-warning-subtle-background',
    description: '',
    value: [
      {
        value: '#ffe299',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b28000',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-subtle-border': {
    name: 'indicator-warning-subtle-border',
    description: '',
    value: [
      {
        value: '#b28000',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b28000',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-subtle-text': {
    name: 'indicator-warning-subtle-text',
    description: '',
    value: [
      {
        value: '#664900',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-supreme-background': {
    name: 'indicator-warning-supreme-background',
    description: '',
    value: [
      {
        value: '#ffb700',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ffe299',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-supreme-border': {
    name: 'indicator-warning-supreme-border',
    description: '',
    value: [
      {
        value: '#b28000',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b28000',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-supreme-text': {
    name: 'indicator-warning-supreme-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-plain-border': {
    name: 'indicator-warning-plain-border',
    description: '',
    value: [
      {
        value: '#b28000',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ffcc4d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'indicator-warning-plain-text': {
    name: 'indicator-warning-plain-text',
    description: '',
    value: [
      {
        value: '#b28000',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ffcc4d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-base-background': {
    name: 'intent-action-supreme-base-background',
    description: '',
    value: [
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-base-border': {
    name: 'intent-action-supreme-base-border',
    description: '',
    value: [
      {
        value: 'light-dark(#66d1ff, #66d1ff)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#66d1ff, #66d1ff)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-base-text': {
    name: 'intent-action-supreme-base-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-hover-background': {
    name: 'intent-action-supreme-hover-background',
    description: '',
    value: [
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-hover-border': {
    name: 'intent-action-supreme-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#3cbef6, #3cbef6)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#3cbef6, #3cbef6)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-hover-text': {
    name: 'intent-action-supreme-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-active-background': {
    name: 'intent-action-supreme-active-background',
    description: '',
    value: [
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-active-border': {
    name: 'intent-action-supreme-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#0caef3, #0caef3)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#0caef3, #0caef3)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-active-text': {
    name: 'intent-action-supreme-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-disabled-background': {
    name: 'intent-action-supreme-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-disabled-border': {
    name: 'intent-action-supreme-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-supreme-disabled-text': {
    name: 'intent-action-supreme-disabled-text',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-base-background': {
    name: 'intent-action-subtle-base-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-base-border': {
    name: 'intent-action-subtle-base-border',
    description: '',
    value: [
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-base-text': {
    name: 'intent-action-subtle-base-text',
    description: '',
    value: [
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-hover-background': {
    name: 'intent-action-subtle-hover-background',
    description: '',
    value: [
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#3cbef6',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-hover-border': {
    name: 'intent-action-subtle-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#3cbef6, #3cbef6)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#3cbef6, #3cbef6)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-hover-text': {
    name: 'intent-action-subtle-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-active-background': {
    name: 'intent-action-subtle-active-background',
    description: '',
    value: [
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-active-border': {
    name: 'intent-action-subtle-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#0caef3, #0caef3)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#0caef3, #0caef3)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-active-text': {
    name: 'intent-action-subtle-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-disabled-background': {
    name: 'intent-action-subtle-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-disabled-border': {
    name: 'intent-action-subtle-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-subtle-disabled-text': {
    name: 'intent-action-subtle-disabled-text',
    description: '',
    value: [
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-plain-base-text': {
    name: 'intent-action-plain-base-text',
    description: '',
    value: [
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#66d1ff',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-plain-hover-text': {
    name: 'intent-action-plain-hover-text',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0caef3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-plain-active-text': {
    name: 'intent-action-plain-active-text',
    description: '',
    value: [
      {
        value: '#076892',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#098bc3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-action-plain-disabled-text': {
    name: 'intent-action-plain-disabled-text',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-base-background': {
    name: 'intent-alternative-supreme-base-background',
    description: '',
    value: [
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-base-border': {
    name: 'intent-alternative-supreme-base-border',
    description: '',
    value: [
      {
        value: 'light-dark(#80e5d3, #80e5d3)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#80e5d3, #80e5d3)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-base-text': {
    name: 'intent-alternative-supreme-base-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-hover-background': {
    name: 'intent-alternative-supreme-hover-background',
    description: '',
    value: [
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-hover-border': {
    name: 'intent-alternative-supreme-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#56dcc4, #56dcc4)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#56dcc4, #56dcc4)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-hover-text': {
    name: 'intent-alternative-supreme-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-active-background': {
    name: 'intent-alternative-supreme-active-background',
    description: '',
    value: [
      {
        value: '#2cd3b5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#2cd3b5',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-active-border': {
    name: 'intent-alternative-supreme-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#2cd3b5, #2cd3b5)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#2cd3b5, #2cd3b5)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-active-text': {
    name: 'intent-alternative-supreme-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-disabled-background': {
    name: 'intent-alternative-supreme-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-disabled-border': {
    name: 'intent-alternative-supreme-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-supreme-disabled-text': {
    name: 'intent-alternative-supreme-disabled-text',
    description: '',
    value: [
      {
        value: '#1a7f6d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-base-background': {
    name: 'intent-alternative-subtle-base-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-base-border': {
    name: 'intent-alternative-subtle-base-border',
    description: '',
    value: [
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-base-text': {
    name: 'intent-alternative-subtle-base-text',
    description: '',
    value: [
      {
        value: '#23a991',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-hover-background': {
    name: 'intent-alternative-subtle-hover-background',
    description: '',
    value: [
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-hover-border': {
    name: 'intent-alternative-subtle-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#56dcc4, #56dcc4)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#56dcc4, #56dcc4)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-hover-text': {
    name: 'intent-alternative-subtle-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-active-background': {
    name: 'intent-alternative-subtle-active-background',
    description: '',
    value: [
      {
        value: '#2cd3b5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#2cd3b5',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-active-border': {
    name: 'intent-alternative-subtle-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#2cd3b5, #2cd3b5)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#2cd3b5, #2cd3b5)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-active-text': {
    name: 'intent-alternative-subtle-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-disabled-background': {
    name: 'intent-alternative-subtle-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-disabled-border': {
    name: 'intent-alternative-subtle-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-subtle-disabled-text': {
    name: 'intent-alternative-subtle-disabled-text',
    description: '',
    value: [
      {
        value: '#23a991',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-plain-base-text': {
    name: 'intent-alternative-plain-base-text',
    description: '',
    value: [
      {
        value: '#23a991',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-plain-hover-text': {
    name: 'intent-alternative-plain-hover-text',
    description: '',
    value: [
      {
        value: '#1a7f6d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#56dcc4',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-plain-active-text': {
    name: 'intent-alternative-plain-active-text',
    description: '',
    value: [
      {
        value: '#1a7f6d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#2cd3b5',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-alternative-plain-disabled-text': {
    name: 'intent-alternative-plain-disabled-text',
    description: '',
    value: [
      {
        value: 'light-dark(#4d5f67, #9aacb3)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#4d5f67, #9aacb3)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-base-background': {
    name: 'intent-danger-supreme-base-background',
    description: '',
    value: [
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-base-border': {
    name: 'intent-danger-supreme-base-border',
    description: '',
    value: [
      {
        value: 'light-dark(#dc2828, #dc2828)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#dc2828, #dc2828)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-base-text': {
    name: 'intent-danger-supreme-base-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-hover-background': {
    name: 'intent-danger-supreme-hover-background',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-hover-border': {
    name: 'intent-danger-supreme-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#b41d1d, #b41d1d)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#b41d1d, #b41d1d)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-hover-text': {
    name: 'intent-danger-supreme-hover-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-active-background': {
    name: 'intent-danger-supreme-active-background',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#911818',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-active-border': {
    name: 'intent-danger-supreme-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#911818, #911818)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#911818, #911818)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-active-text': {
    name: 'intent-danger-supreme-active-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-disabled-background': {
    name: 'intent-danger-supreme-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-disabled-border': {
    name: 'intent-danger-supreme-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-supreme-disabled-text': {
    name: 'intent-danger-supreme-disabled-text',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e76a6a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-base-background': {
    name: 'intent-danger-subtle-base-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-base-border': {
    name: 'intent-danger-subtle-base-border',
    description: '',
    value: [
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-base-text': {
    name: 'intent-danger-subtle-base-text',
    description: '',
    value: [
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-hover-background': {
    name: 'intent-danger-subtle-hover-background',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-hover-border': {
    name: 'intent-danger-subtle-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#b41d1d, #b41d1d)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#b41d1d, #b41d1d)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-hover-text': {
    name: 'intent-danger-subtle-hover-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-active-background': {
    name: 'intent-danger-subtle-active-background',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#911818',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-active-border': {
    name: 'intent-danger-subtle-active-border',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#911818',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-active-text': {
    name: 'intent-danger-subtle-active-text',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-disabled-background': {
    name: 'intent-danger-subtle-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-disabled-border': {
    name: 'intent-danger-subtle-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-subtle-disabled-text': {
    name: 'intent-danger-subtle-disabled-text',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ee9696',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-plain-base-text': {
    name: 'intent-danger-plain-base-text',
    description: '',
    value: [
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e76a6a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-plain-hover-text': {
    name: 'intent-danger-plain-hover-text',
    description: '',
    value: [
      {
        value: '#b41d1d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-plain-active-text': {
    name: 'intent-danger-plain-active-text',
    description: '',
    value: [
      {
        value: '#911818',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dc2828',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-danger-plain-disabled-text': {
    name: 'intent-danger-plain-disabled-text',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-base-background': {
    name: 'intent-highlight-supreme-base-background',
    description: '',
    value: [
      {
        value: '#ece079',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ece079',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-base-border': {
    name: 'intent-highlight-supreme-base-border',
    description: '',
    value: [
      {
        value: 'light-dark(#ece079, #ece079)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#ece079, #ece079)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-base-text': {
    name: 'intent-highlight-supreme-base-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-hover-background': {
    name: 'intent-highlight-supreme-hover-background',
    description: '',
    value: [
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-hover-border': {
    name: 'intent-highlight-supreme-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e5d64d, #e5d64d)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e5d64d, #e5d64d)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-hover-text': {
    name: 'intent-highlight-supreme-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-active-background': {
    name: 'intent-highlight-supreme-active-background',
    description: '',
    value: [
      {
        value: '#dfcc20',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dfcc20',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-active-border': {
    name: 'intent-highlight-supreme-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#dfcc20, #dfcc20)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#dfcc20, #dfcc20)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-active-text': {
    name: 'intent-highlight-supreme-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-disabled-background': {
    name: 'intent-highlight-supreme-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-disabled-border': {
    name: 'intent-highlight-supreme-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#e9edee, #262f32), light-dark(#e9edee, #262f32))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-supreme-disabled-text': {
    name: 'intent-highlight-supreme-disabled-text',
    description: '',
    value: [
      {
        value: '#8e800b',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#ece079',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-base-background': {
    name: 'intent-highlight-subtle-base-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-base-border': {
    name: 'intent-highlight-subtle-base-border',
    description: '',
    value: [
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-base-text': {
    name: 'intent-highlight-subtle-base-text',
    description: '',
    value: [
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-hover-background': {
    name: 'intent-highlight-subtle-hover-background',
    description: '',
    value: [
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-hover-border': {
    name: 'intent-highlight-subtle-hover-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e5d64d, #e5d64d)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e5d64d, #e5d64d)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-hover-text': {
    name: 'intent-highlight-subtle-hover-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-active-background': {
    name: 'intent-highlight-subtle-active-background',
    description: '',
    value: [
      {
        value: '#dfcc20',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#dfcc20',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-active-border': {
    name: 'intent-highlight-subtle-active-border',
    description: '',
    value: [
      {
        value: 'light-dark(#dfcc20, #dfcc20)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#dfcc20, #dfcc20)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-active-text': {
    name: 'intent-highlight-subtle-active-text',
    description: '',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-disabled-background': {
    name: 'intent-highlight-subtle-disabled-background',
    description: '',
    value: [
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#fafbfb, #171c1e)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-disabled-border': {
    name: 'intent-highlight-subtle-disabled-border',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-subtle-disabled-text': {
    name: 'intent-highlight-subtle-disabled-text',
    description: '',
    value: [
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-plain-base-text': {
    name: 'intent-highlight-plain-base-text',
    description: '',
    value: [
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e5d64d',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-plain-hover-text': {
    name: 'intent-highlight-plain-hover-text',
    description: '',
    value: [
      {
        value: '#8e800b',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-plain-active-text': {
    name: 'intent-highlight-plain-active-text',
    description: '',
    value: [
      {
        value: '#8e800b',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#b3a31a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'intent-highlight-plain-disabled-text': {
    name: 'intent-highlight-plain-disabled-text',
    description: '',
    value: [
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(light-dark(#4d5f67, #9aacb3), light-dark(#4d5f67, #9aacb3))',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'surface-base': {
    name: 'surface-base',
    description: '',
    value: [
      {
        value: '#fafbfb',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#171c1e',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'surface-container': {
    name: 'surface-container',
    description: '',
    value: [
      {
        value: '#f1f4f5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#1d2427',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'surface-container1': {
    name: 'surface-container1',
    description: '',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#262f32',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'surface-popover': {
    name: 'surface-popover',
    description: '',
    value: [
      {
        value: '#f1f4f5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#1d2427',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'surface-window': {
    name: 'surface-window',
    description: '',
    value: [
      {
        value: '#f1f4f5',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#1d2427',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'shape-stroke-color': {
    name: 'shape-stroke-color',
    description: '',
    value: [
      {
        value: '#e3e8ea',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#37444a',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-main': {
    name: 'typography-main',
    description: 'Regular text color',
    value: [
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-inverse': {
    name: 'typography-inverse',
    description: 'Text color for more contrast (e.g. high-contrast or reduced)',
    value: [
      {
        value: '#e9edee',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#0c0e10',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-subtle': {
    name: 'typography-subtle',
    description: '',
    value: [
      {
        value: '#37444a',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#d4dcdf',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-muted': {
    name: 'typography-muted',
    description: '',
    value: [
      {
        value: '#4d5f67',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#9aacb3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-emphasize': {
    name: 'typography-emphasize',
    description: '',
    value: [
      {
        value: '#23a991',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#80e5d3',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-selected-background': {
    name: 'typography-selected-background',
    description: '',
    value: [
      {
        value: '#f2eba6',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: '#094339',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-code-text': {
    name: 'typography-code-text',
    description: '',
    value: [
      {
        value: 'light-dark(#37444a, #d4dcdf)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#37444a, #d4dcdf)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  },
  'typography-code-background': {
    name: 'typography-code-background',
    description: '',
    value: [
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'light'
        }
      },
      {
        value: 'light-dark(#e9edee, #262f32)',
        features: {
          'color-scheme': 'dark'
        }
      }
    ],
    type: 'color'
  }
};
