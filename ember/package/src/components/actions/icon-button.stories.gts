import { action } from 'storybook/actions';

import {
  DISABLED_ARG_TYPE,
  getIconSvg,
  ICON_ARG_TYPES,
  IMPORTANCE_ARG_TYPES,
  INTENT_ARG_TYPES,
  parseOptionalBooleanArg,
  SPACING_ARG_TYPE
} from '#storybook';

import { IconButton } from './icon-button.gts';

import type { IconButtonSignature } from './icon-button.gts';
import type { Meta, StoryObj } from 'ember-storybook';

/* Use signature args directly, once */
type IconButtonArgs = Partial<IconButtonSignature['Args']>;

export default {
  title: 'Actions/IconButton',
  component: IconButton,
  argTypes: {
    ...INTENT_ARG_TYPES,
    ...IMPORTANCE_ARG_TYPES,
    ...SPACING_ARG_TYPE,
    ...DISABLED_ARG_TYPE,
    ...ICON_ARG_TYPES
  }
} satisfies Meta;

function parseArgs(args: IconButtonArgs): IconButtonArgs {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled),
    icon: getIconSvg(args.icon as string)
  };
}

export const Showcase: StoryObj<IconButtonArgs> = {
  args: {
    label: 'Text',
    icon: 'acorn',
    push: action('button pushed')
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  decorators: [(story, { args }) => story(parseArgs(args))]
};
