import type { Token as BaseToken } from '@theemo/tokens';

export interface Token extends BaseToken {
  figmaName?: string;
}

// Intents

export enum Intent {
  Action = 'action',
  Alternative = 'alternative',
  Highlight = 'highlight',
  Danger = 'danger'
}

export type Intents = `${Intent}`;

// Importances

export enum Importance {
  Supreme = 'supreme',
  Subtle = 'subtle',
  Plain = 'plain'
}

export type Importances = `${Importance}`;

// Indicators

export enum Indicator {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export type Indicators = `${Indicator}`;

// Spacing

export enum Spacing {
  Zero = '0',
  MinusOne = '-1'
}

export type Spacings = `${Spacing}`;

export { tokens } from './tokens';
