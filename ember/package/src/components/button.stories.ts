import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';

import { Importance, Intent, Spacing } from '@hokulea/tokens';

import type { Importances, Intents, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

// import type { ButtonSignature } from './button';
interface ButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: {
    push?: CommandAction;
    intent?: Intent | Intents;
    importance?: Importance | Importances;
    spacing?: Spacing | Spacings;
    disabled?: boolean;
  };
  Blocks: {
    /** The label for the button */
    default: [];

    /** The label for the button */
    label: [];

    /** A slot in front of the label */
    before: [];

    /** A slot after the label */
    after: [];
  };
}

const baseArgTypes = {
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
  }
};

export default {
  title: 'Components/Actions/Button',
  component: 'button',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

/* Use signature args directly, once */
type ButtonArgs = Partial<ButtonSignature['Args']>;

function parseArgs(args: ButtonArgs): ButtonArgs {
  return {
    ...args,
    disabled:
      typeof args.disabled === 'boolean'
        ? args.disabled
        : typeof args.disabled === 'string'
          ? JSON.parse(args.disabled)
          : undefined,
    push: action('button pushed')
  };
}

const Template = (args: ButtonArgs) => {
  return {
    template: hbs`
      <Button
        @push={{this.push}}
        @intent={{this.intent}}
        @importance={{this.importance}}
        @spacing={{this.spacing}}
        @disabled={{this.disabled}}
      >
        {{this.label}}
      </Button>
    `,
    context: parseArgs(args)
  };
};

export const Default = Template.bind({});
Default.argTypes = baseArgTypes;
Default.args = {
  label: 'Button'
};
Default.parameters = {
  design: [
    {
      name: 'Action',
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
    },
    {
      name: 'Danger',
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
    },
    {
      name: 'Specification',
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
    }
  ]
};

// export const WithBefore = (args: ButtonArgs) => {
//   return {
//     template: hbs`
//       <Button
//         @push={{this.push}}
//         @intent={{this.intent}}
//         @importance={{this.importance}}
//         @spacing={{this.spacing}}
//         @disabled={{this.disabled}}
//       >
//         <:before>
//           <Icon @icon={{this.icon}} @style={{this.style}}/>
//         </:before>
//         <:label>
//           {{this.label}}
//         </:label>
//       </Button>
//     `,
//     context: parseArgs(args)
//   };
// };

// WithBefore.argTypes = iconArgTypes;
// WithBefore.args = {
//   label: 'Button',
//   icon: IconName.Placeholder
// };
// WithBefore.parameters = {
//   design: [
//     {
//       type: 'figma',
//       url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
//     }
//   ]
// };

// export const WithAfter = (args: ButtonArgs) => {
//   return {
//     template: hbs`
//       <Button
//         @push={{this.push}}
//         @intent={{this.intent}}
//         @importance={{this.importance}}
//         @spacing={{this.spacing}}
//         @disabled={{this.disabled}}
//       >
//         <:label>
//           {{this.label}}
//         </:label>
//         <:after>
//           <Icon @icon={{this.icon}} @style={{this.style}}/>
//         </:after>
//       </Button>
//     `,
//     context: parseArgs(args)
//   };
// };

// WithAfter.argTypes = iconArgTypes;
// WithAfter.args = {
//   label: 'Button',
//   icon: IconName.Placeholder
// };
// WithAfter.parameters = {
//   design: [
//     {
//       type: 'figma',
//       url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
//     }
//   ]
// };

export const Stack = () => {
  return {
    template: hbs`
      <div style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;">
        <Button @importance="supreme" @push={{this.push}}>
          Supreme
        </Button>

        <Button @importance="subtle" @push={{this.push}}>
          Subtle
        </Button>

        <Button @importance="muted" @push={{this.push}}>
          Muted
        </Button>

        <Button @importance="plain" @push={{this.push}}>
          Plain
        </Button>
      </div>
    `,
    context: {
      push: action('button pushed')
    }
  };
};

Stack.parameters = {
  options: {
    showPanel: false
  },
  design: [
    {
      type: 'figma',
      url: 'https://www.figma.com/file/97CLleUR6W4v80RwlgnmlB/K-%7C-Components?type=design&node-id=719%3A3165&mode=design&t=6Bkzi2ao9SnuRE1l-1'
    }
  ]
};
