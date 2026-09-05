import { getIconSvg, ICON_ARG_TYPES, IMPORTANCE_ARG_TYPES, INDICATOR_ARG_TYPES } from '#storybook';

import { Alert, type AlertSignature } from './alert.gts';

import type { Meta, StoryObj } from 'ember-storybook';

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
    ...INDICATOR_ARG_TYPES,
    ...IMPORTANCE_ARG_TYPES,
    ...ICON_ARG_TYPES,
    title: {
      control: 'text'
    },
    content: {
      control: 'text'
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
