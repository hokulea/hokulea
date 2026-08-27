import { getIconSvg, listIcons } from '../../-private/stories.ts';
import { Icon, type IconSignature } from './icon.gts';

import type { Meta, StoryObj } from 'ember-storybook';

const iconNames = listIcons();

type IconArgs = IconSignature['Args'];

function parseArgs(args: IconArgs): IconArgs {
  return {
    ...args,
    icon: getIconSvg(args.icon as string) ?? ''
  };
}

export default {
  title: 'Graphics/Icon',
  component: Icon,
  argTypes: {
    icon: {
      options: iconNames.toSorted(),
      control: 'select'
    }
  }
} satisfies Meta;

export const Showcase: StoryObj<IconArgs> = {
  render: (args) => <template><Icon @icon={{args.icon}} /></template>,
  args: {
    icon: 'acorn'
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  decorators: [(story, { args }) => story(parseArgs(args))]
};

export const WithText: StoryObj<IconArgs> = {
  render: (args) => <template>
    <p>
      <Icon @icon={{args.icon}} />
      Text next to the icon
    </p>
  </template>,
  args: {
    icon: 'acorn'
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  decorators: [(story, { args }) => story(parseArgs(args))]
};
