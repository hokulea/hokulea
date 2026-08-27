import { action } from 'storybook/actions';

import { Importance, Intent, Spacing } from '@hokulea/tokens';

import { getIconSvg, listIcons, parseOptionalBooleanArg } from '../../-private/stories.ts';
import { IconButton } from './icon-button.gts';

import type { IconButtonSignature } from './icon-button.gts';
import type { Meta, StoryObj } from 'ember-storybook';

const iconNames = listIcons();

/* Use signature args directly, once */
type IconButtonArgs = Partial<IconButtonSignature['Args']>;

export default {
  title: 'Actions/IconButton',
  component: IconButton,
  argTypes: {
    intent: {
      options: Object.values(Intent),
      control: {
        type: 'radio',
        labels: {
          [Intent.Action]: 'action (default)',
          [Intent.Danger]: 'danger'
        }
      }
    },
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
    },
    spacing: {
      options: Object.values(Spacing),
      control: {
        type: 'radio',
        labels: {
          [Spacing.Zero]: '0 (default)',
          [Spacing.MinusOne]: '-1'
        }
      }
    },
    pressed: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    icon: {
      options: iconNames.toSorted(),
      control: 'select'
    }
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
