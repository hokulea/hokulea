import { Avatar, type AvatarSignature } from './avatar.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type AvatarArgs = AvatarSignature['Args'];

export default {
  title: 'Graphics/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      name: 'src',
      control: 'text'
    },
    name: {
      name: 'name',
      control: 'text'
    }
  }
} satisfies Meta;

export const Showcase: StoryObj<AvatarArgs> = {
  render: (args) => <template><Avatar @src={{args.src}} @name={{args.name}} /></template>,
  args: {
    src: 'https://avatars.githubusercontent.com/u/283700?v=4',
    name: 'Thomas Gossmann'
  }
};
