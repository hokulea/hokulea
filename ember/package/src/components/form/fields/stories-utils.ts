import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '../../../-private/stories';

import type { InputType } from 'storybook/internal/types';

export interface FieldArgs {
  label: string;
  description: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  submit: (data: object) => void;
}

const labelArgType: InputType = {
  control: 'text'
};

const descriptionArgType: InputType = {
  control: 'text'
};

const disabledArgType: InputType = {
  control: 'boolean'
};

const requiredArgType: InputType = {
  control: 'boolean'
};

const placeholderArgType: InputType = {
  control: 'text'
};

export const baseArgTypes = {
  label: labelArgType,
  description: descriptionArgType,
  disabled: disabledArgType,
  required: requiredArgType
};

export const argTypesWithPlaceholder = {
  ...baseArgTypes,
  placeholder: placeholderArgType
};

export function parseArgs(args: FieldArgs): FieldArgs {
  return {
    ...args,
    disabled: parseOptionalBooleanArg(args.disabled),
    required: parseOptionalBooleanArg(args.required),
    submit: (data) => {
      if (data instanceof Event) {
        return;
      }

      action('form submitted')(data);
    }
  };
}
