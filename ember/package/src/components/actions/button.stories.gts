import { action } from 'storybook/actions';

import { parseOptionalBooleanArg } from '#src/-private/stories.ts';

import { Importance, Intent, Spacing } from '@hokulea/tokens';

import { Button, type ButtonSignature } from './button.gts';

import type { Meta, StoryObj } from 'ember-storybook';

/* Use signature args directly, once */
type ButtonArgs = Partial<ButtonSignature['Args']>;
type StoryArgs = ButtonArgs & { label: string };

export default {
  title: 'Actions/Button',
  component: Button,
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
      control: 'text',
      table: {
        category: 'Demo'
      }
    },
    disabled: {
      control: 'boolean'
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

export const Showcase: StoryObj<StoryArgs> = {
  render: (args) => <template>
    <Button
      @push={{args.push}}
      @intent={{args.intent}}
      @importance={{args.importance}}
      @spacing={{args.spacing}}
      @disabled={{args.disabled}}
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
  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const Stack: StoryObj = {
  render: () => <template>
    <div
      style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;"
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
