import { hbs } from 'ember-cli-htmlbars';

import { icons } from '@phosphor-icons/core';
import { action } from '@storybook/addon-actions';

import { Importance, Intent, Spacing } from '@hokulea/tokens';

import type { Importances, Intents, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

const iconNames = icons.map((entry) => entry.name);

// import type { IconButtonSignature } from './icon-button';
interface IconButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: {
    push?: CommandAction;
    intent?: Intent | Intents;
    importance?: Importance | Importances;
    spacing?: Spacing | Spacings;
    disabled?: boolean;
    label: string;
    /** The name of the icon */
    icon: string;
  };
  Blocks: {
    default: [];
  };
}

export default {
  title: 'Components/Actions/IconButton',
  component: 'button',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  },
  argTypes: {
    intent: {
      name: 'Intent',
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
      name: 'Importance',
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
      name: 'Spacing',
      options: Object.values(Spacing),
      control: {
        type: 'radio',
        labels: {
          [Spacing.Zero]: '0 (default)',
          [Spacing.MinusOne]: '-1'
        }
      }
    },
    label: {
      name: 'Label',
      control: 'text'
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean'
    },
    icon: {
      name: 'Icon',
      options: iconNames.sort(),
      control: 'select'
    },
    iconStyle: {
      name: 'Icon Style',
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
      control: {
        type: 'radio',
        labels: {
          thin: 'thin',
          light: 'light',
          regular: 'regular (default)',
          bold: 'bold',
          fill: 'fill',
          duotone: 'duotone'
        }
      }
    }
  }
};

/* Use signature args directly, once */
type IconButtonArgs = Partial<IconButtonSignature['Args']>;

const Template = (args: IconButtonArgs) => {
  return {
    template: hbs`
      <IconButton
        @push={{this.push}}
        @intent={{this.intent}}
        @importance={{this.importance}}
        @spacing={{this.spacing}}
        @disabled={{this.disabled}}
        @label={{this.label}}
        @icon={{this.icon}}
        @iconStyle={{this.iconStyle}}
      />
    `,
    context: {
      ...args,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      disabled:
        typeof args.disabled === 'boolean'
          ? args.disabled
          : typeof args.disabled === 'string'
            ? JSON.parse(args.disabled)
            : undefined,
      push: action('button pushed')
    }
  };
};

export const Showcase = {
  render: Template.bind({}),
  args: {
    label: 'Text',
    icon: 'acorn'
  }
};
