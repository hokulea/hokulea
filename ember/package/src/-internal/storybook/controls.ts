import type { InputType } from 'storybook/internal/types';

export const DISABLED_ARG_TYPE: { disabled: InputType } = {
  disabled: {
    control: 'boolean'
  }
};

export const PLACEHOLDER_ARG_TYPE: { placeholder: InputType } = {
  placeholder: {
    control: 'text'
  }
};

export const ORIENTATION_ARG_TYPE: { orientation: InputType } = {
  orientation: {
    options: ['horizontal', 'vertical'],
    control: 'radio'
  }
};
