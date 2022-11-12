export interface Token {
  value: string;
  comment?: string;
  type: string;
  attributes: Record<string, string>;
  filePath: string;
  isSource: boolean;
  original: Record<string, unknown>;
  name: string;
  figmaName?: string;
  path: string[];
  colorScheme?: 'light' | 'dark';
  computed?: boolean;
  documentation?: boolean;
}

export enum Intent {
  Action = 'action',
  Alternative = 'alternative',
  Highlight = 'highlight',
  Danger = 'danger'
}

export const INTENTS = [Intent.Action, Intent.Alternative, Intent.Highlight, Intent.Danger];

export enum Importance {
  Supreme = 'supreme',
  Subtle = 'subtle',
  Plain = 'plain'
}

export const IMPORTANCES = [Importance.Supreme, Importance.Subtle, Importance.Plain];

export enum Indicator {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export const INDICATORS = [Indicator.Info, Indicator.Success, Indicator.Warning, Indicator.Error];

export { tokens } from './tokens';
