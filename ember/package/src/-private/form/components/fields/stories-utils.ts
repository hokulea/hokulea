import { action } from '@storybook/addon-actions';

export interface FieldArgs {
  label: string;
  description: string;
  placeholder: string;
  disabled?: boolean | string;
  required?: boolean | string;
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
    disabled:
      typeof args.disabled === 'string' ? (JSON.parse(args.disabled) as boolean) : args.disabled,
    required:
      typeof args.required === 'string' ? (JSON.parse(args.required) as boolean) : args.disabled,
    submit: (data) => {
      if (data instanceof Event) {
        return;
      }

      action('form submitted')(data);
    }
  };
}
