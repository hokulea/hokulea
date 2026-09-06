import { Importance, Indicator, Intent, Spacing } from '@hokulea/tokens';

import { listIcons } from './icons';

import type { InputType } from 'storybook/internal/csf';

export const SPACING_ARG_TYPE: { spacing: InputType } = {
  spacing: {
    options: Object.values(Spacing),
    control: {
      type: 'radio',
      labels: {
        [Spacing.One]: '1',
        [Spacing.Zero]: '0 (default)',
        [Spacing.MinusOne]: '-1'
      }
    }
  }
};

export const INTENT_ARG_TYPES: { intent: InputType } = {
  intent: {
    options: Object.values(Intent),
    control: {
      type: 'radio',
      labels: {
        [Intent.Action]: 'action (default)',
        [Intent.Danger]: 'danger'
      }
    }
  }
};

export const INDICATOR_ARG_TYPES: { indicator: InputType } = {
  indicator: {
    options: Object.values(Indicator),
    control: {
      type: 'radio',
      labels: {
        [Indicator.Neutral]: 'neutral (default)',
        [Indicator.Info]: 'info',
        [Indicator.Success]: 'success',
        [Indicator.Warning]: 'warning',
        [Indicator.Error]: 'error'
      }
    }
  }
};

export const IMPORTANCE_ARG_TYPES: { importance: InputType } = {
  importance: {
    options: Object.values(Importance),
    control: {
      type: 'radio',
      labels: {
        [Importance.Supreme]: 'supreme (default)',
        [Importance.Subtle]: 'subtle',
        [Importance.Plain]: 'plain'
      }
    }
  }
};

const iconNames = listIcons();

export const ICON_ARG_TYPES: { icon: InputType } = {
  icon: {
    options: iconNames.toSorted(),
    control: 'select'
  }
};
