import { Page, type PageSignature } from './page.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type PageArgs = PageSignature['Args'] & { content: string };

export default {
  title: 'Layouts/Page',
  component: Page,
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

export const Showcase: StoryObj<PageArgs> = {
  render: (args) => <template>
    <Page @title={{args.title}} @description={{args.description}}>
      <p>{{args.content}}</p>
    </Page>
  </template>,
  args: {
    title: 'Heading',
    content: 'Hello World'
  }
};

export const Simple: StoryObj = {
  render: () => <template>
    <Page @title="Training">
      <p>Planning, Diagnostics, Control, Documentation</p>
    </Page>
  </template>
};

export const Details: StoryObj = {
  render: () => <template>
    <Page @title="Training">
      <:title>Training</:title>
      <:description>Ways of organizing your practice</:description>
      <:content>
        <p>Planning, Diagnostics, Control, Documentation</p>
      </:content>
    </Page>
  </template>
};
