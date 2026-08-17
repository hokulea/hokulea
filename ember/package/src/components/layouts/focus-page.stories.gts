import { FocusPage, type FocusPageSignature } from './focus-page.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type FocusPageArgs = FocusPageSignature['Args'] & { content: string };

export default {
  title: 'Layouts/FocusPage',
  component: FocusPage,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text'
    },
    description: {
      name: 'Description',
      control: 'text'
    },
    content: {
      name: 'Content',
      control: 'text'
    }
  }
} satisfies Meta;

export const Showcase: StoryObj<FocusPageArgs> = {
  render: (args) => <template>
    <FocusPage @title={{args.title}} @description={{args.description}}>
      <p>{{args.content}}</p>
    </FocusPage>
  </template>,
  args: {
    title: 'Heading',
    content: 'Hello World'
  }
};

export const Simple: StoryObj = {
  render: () => <template>
    <FocusPage @title="Training">
      <p>Planning, Diagnostics, Control, Documentation</p>
    </FocusPage>
  </template>
};

export const Details: StoryObj = {
  render: () => <template>
    <FocusPage @title="Training">
      <:title>Training</:title>
      <:description>Ways of organizing your practice</:description>
      <:content>
        <p>Planning, Diagnostics, Control, Documentation</p>
      </:content>
    </FocusPage>
  </template>
};
