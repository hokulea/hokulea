import { Importance, Indicator } from '@hokulea/tokens';

import { getIconSvg, listIcons } from '../../-private/stories.ts';
import { Alert, type AlertSignature } from './alert.gts';

import type { Meta, StoryObj } from 'ember-storybook';

const iconNames = listIcons();

type AlertArgs = Partial<AlertSignature['Args']> & { content: string };

function parseArgs(args: AlertArgs): AlertArgs {
  return {
    ...args,
    icon: getIconSvg(args.icon as string)
  };
}

export default {
  title: 'Feedback/Alert',
  component: Alert,
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
      options: iconNames.toSorted(),
      control: 'select'
    }
  }
} satisfies Meta;

export const Showcase: StoryObj<AlertArgs> = {
  render: (args) => <template>
    <Alert
      @indicator={{args.indicator}}
      @importance={{args.importance}}
      @title={{args.title}}
      @icon={{args.icon}}
    >
      {{args.content}}
    </Alert>
  </template>,
  args: {
    title: 'Title',
    content: 'Your message'
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  decorators: [(story, { args }) => story(parseArgs(args))]
};
