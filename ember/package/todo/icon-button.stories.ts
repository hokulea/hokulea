import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

import { IconName, StyleName } from '@hokulea/icons';
import { Importance, Intent, Spacing } from '@hokulea/tokens';

import type { IconNames, StyleNames } from '@hokulea/icons';
import type { Importances, Intents, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

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
    icon: IconName | IconNames;
    /** The style for the icon */
    style?: StyleName | StyleNames;
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
          [Importance.Muted]: 'muted',
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
      options: Object.values(IconName).sort(),
      control: 'select'
    },
    style: {
      name: 'Style',
      options: Object.values(StyleName),
      control: {
        type: 'radio',
        labels: {
          [StyleName.Regular]: 'regular (default)',
          [StyleName.Filled]: 'filled'
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
        @style={{this.style}}
      />
    `,
    context: {
      ...args,
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

export const Default = Template.bind({});
Default.args = {
  label: 'Text',
  icon: IconName.Placeholder
};
Default.parameters = {
  design: [
    {
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=689%3A4612&t=9EsqN4F3D1emPtSj-1'
    },
    {
      name: 'Specification',
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=689%3A4512&t=9EsqN4F3D1emPtSj-1'
    }
  ]
};
