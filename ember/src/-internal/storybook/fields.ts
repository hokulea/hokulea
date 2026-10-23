import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from './args';
import { DISABLED_ARG_TYPE, PLACEHOLDER_ARG_TYPE } from './controls';

import type { InputType } from 'storybook/internal/types';

export interface FieldArgs {
  disabled: boolean;
  label: string;
  description: string;
  required: boolean;
  placeholder: string;
  submit: (data: object) => void;
}

const REQUIRED_ARG_TYPE: InputType = {
  control: 'boolean'
};

const LABEL_ARG_TYPE: InputType = {
  control: 'text'
};

const DESCRIPTION_ARG_TYPE: InputType = {
  control: 'text'
};

export const fieldArgTypes = {
  disabled: DISABLED_ARG_TYPE,
  label: LABEL_ARG_TYPE,
  description: DESCRIPTION_ARG_TYPE,
  required: REQUIRED_ARG_TYPE
};

export const fieldArgTypesWithPlaceholder = {
  ...fieldArgTypes,
  ...PLACEHOLDER_ARG_TYPE
};

export function parseFieldArgs(args: FieldArgs): FieldArgs {
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
