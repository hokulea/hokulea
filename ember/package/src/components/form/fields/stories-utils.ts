import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../../-private/stories';

export interface FieldArgs {
  label: string;
  description: string;
  placeholder: string;
  disabled: boolean | string;
  required: boolean | string;
  submit: (data: object) => void;
}

export const baseArgTypes = {
  label: {
    name: 'Label',
    control: 'text'
  },
  description: {
    name: 'Description',
    control: 'text'
  },
  disabled: {
    name: 'Disabled',
    control: 'boolean'
  },
  required: {
    name: 'Required',
    control: 'boolean'
  }
};

export const argTypesWithPlaceholder = {
  ...baseArgTypes,
  placeholder: {
    name: 'Placeholder',
    control: 'text'
  }
};

export function parseArgs(args: FieldArgs): FieldArgs {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled) ?? false,
    required: parseOptionalBooleanArg(args.required) ?? false,
    submit: (data) => {
      if (data instanceof Event) {
        return;
      }

      action('form submitted')(data);
    }
  };
}
