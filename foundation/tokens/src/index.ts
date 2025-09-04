import type { Token as BaseToken } from '@theemo/tokens';

export interface Token extends BaseToken {
  figmaName?: string;
}

// Intents

export const Intent = {
  Action: 'action',
  Alternative: 'alternative',
  Highlight: 'highlight',
  Danger: 'danger'
} as const;

export type Intent = (typeof Intent)[keyof typeof Intent];

// Importances

export const Importance = {
  Supreme: 'supreme',
  Subtle: 'subtle',
  Plain: 'plain'
} as const;

export type Importance = (typeof Intent)[keyof typeof Intent];

// Indicators

export const Indicator = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error'
} as const;

export type Indicator = (typeof Indicator)[keyof typeof Indicator];

// Spacing

export const Spacing = {
  Zero: '0',
  MinusOne: '-1'
} as const;

export type Spacing = (typeof Spacing)[keyof typeof Spacing];

export { tokens } from './tokens';
