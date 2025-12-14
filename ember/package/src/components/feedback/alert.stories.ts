import { hbs } from 'ember-cli-htmlbars';

import { Importance, Indicator } from '@hokulea/tokens';

import { getIconSvg, listIcons } from '../../-private/stories.ts';

import type { IconAsset } from '../graphics/icon.gts';
import type { ComponentLike } from '@glint/template';

const iconNames = listIcons();

export interface AlertSignature<E extends Element = HTMLDivElement> {
  Element: E;
  Args: {
    element?: ComponentLike<{ Element: HTMLElement }>;
    indicator?: Indicator;
    importance?: Importance;
    icon?: IconAsset;
    title?: string;
  };
  Blocks: {
    default?: [];
    title?: [];
    content?: [];
    actions?: [];
  };
}

export default {
  title: 'Components/Feedback/Alert',
  component: 'alert',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  },
  argTypes: {
    indicator: {
      name: 'Indicator',
      options: Object.values(Indicator),
      control: {
        type: 'radio',
        labels: {
          [Indicator.Neutral]: 'neutral (default)',
          [Indicator.Info]: 'info',
          [Indicator.Success]: 'success',
          [Indicator.Warning]: 'warning',
          [Indicator.Error]: 'error'
        }
      }
    },
    importance: {
      name: 'Importance',
      options: Object.values(Importance),
      control: {
        type: 'radio',
        labels: {
          [Importance.Supreme]: 'supreme',
          [Importance.Subtle]: 'subtle (default)',
          [Importance.Plain]: 'plain'
        }
      }
    },
    title: {
      name: 'Title',
      control: 'text'
    },
    content: {
      name: 'Content',
      control: 'text'
    },
    icon: {
      name: 'Icon',
      options: iconNames.sort(),
      control: 'select'
    }
  }
};

/* Use signature args directly, once */
type AlertArgs = Partial<AlertSignature['Args']>;

const Template = (args: AlertArgs) => {
  return {
    template: hbs`
      <Alert
        @push={{this.push}}
        @indicator={{this.indicator}}
        @importance={{this.importance}}
        @title={{this.title}}
        @icon={{this.icon}}
      >
        {{this.content}}
      </Alert>
    `,
    context: {
      ...args,
      icon: getIconSvg(args.icon as string)
    }
  };
};

export const Showcase = {
  render: Template.bind({}),
  args: {
    title: 'Title',
    content: 'Your message'
  }
};
