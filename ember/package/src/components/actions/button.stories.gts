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

import { Icon } from '../graphics/icon.gts';
import { Button, type ButtonSignature } from './button.gts';

import type { Meta, StoryObj } from 'ember-storybook';

/* Use signature args directly, once */
type ButtonArgs = Partial<ButtonSignature['Args']>;
type StoryArgs = ButtonArgs & { label: string };

export default {
  title: 'Actions/Button',
  component: Button,
  argTypes: {
    ...INTENT_ARG_TYPES,
    ...IMPORTANCE_ARG_TYPES,
    ...SPACING_ARG_TYPE,
    ...DISABLED_ARG_TYPE,
    label: {
      control: 'text',
      table: {
        category: 'Block'
      }
    }
  }
} satisfies Meta;

function parseArgs(args: StoryArgs): StoryArgs {
  return {
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    disabled: parseOptionalBooleanArg(args.disabled)
  };
}

function parseArgsWithIcon(args: StoryArgs & { icon: string }): StoryArgs & { icon: string } {
  return {
    ...parseArgs(args),
    icon: getIconSvg(args.icon as string) as string
  };
}

export const Showcase: StoryObj<StoryArgs> = {
  render: (args) => <template>
    <Button
      @push={{args.push}}
      @intent={{args.intent}}
      @importance={{args.importance}}
      @spacing={{args.spacing}}
      @disabled={{args.disabled}}
      @pressed={{args.pressed}}
    >
      {{args.label}}
    </Button>
  </template>,
  args: {
    label: 'Button',
    push: action('button pushed')
  },
  parameters: {
    design: [
      {
        name: 'Button',
        type: 'figma',
        url: 'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Hokulea?type=design&node-id=5536%3A294&mode=design&t=iSaWUPpVi5tWVgwi-1'
      }
    ]
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story({ args: parseArgs(args) })]
};

export const WithIcon: StoryObj = {
  render: (args) => <template>
    <Button>
      <:before>
        <Icon @icon={{args.icon}} />
      </:before>
      <:label>
        Label
      </:label>
    </Button>
  </template>,
  argTypes: {
    ...ICON_ARG_TYPES
  },
  args: {
    icon: 'acorn'
  },
  // @ts-expect-error some types are confused
  decorators: [(story, { args }) => story({ args: parseArgsWithIcon(args) })]
};

export const Stack: StoryObj = {
  render: () => <template>
    <div
      style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-1); margin: auto;"
    >
      <Button @importance="supreme">
        Supreme
      </Button>

      <Button @importance="subtle">
        Subtle
      </Button>

      <Button @importance="plain">
        Plain
      </Button>
    </div>
  </template>
};
