import { action } from 'storybook/actions';

import { Page } from './page.gts';
import { SectionedPage, type SectionedPageSignature } from './sectioned-page.gts';

import type { Meta, StoryObj } from 'ember-storybook';

function link(name: string) {
  return {
    url: name,
    open: (e: MouseEvent) => {
      action('open link')(name);
      e.preventDefault();
    },
    isActive: name === 'planning'
  };
}

type SectionedPageArgs = SectionedPageSignature['Args'] & { content: string };

export default {
  title: 'Layouts/SectionedPage',
  component: SectionedPage,
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

export const Showcase: StoryObj<SectionedPageArgs> = {
  render: (args) => <template>
    <SectionedPage @title={{args.title}} @description={{args.description}}>
      <p>{{args.content}}</p>
    </SectionedPage>
  </template>,
  args: {
    title: 'Heading',
    content: 'Hello World'
  }
};

export const Simple: StoryObj = {
  render: () => <template>
    <SectionedPage @title="Training">
      <p>Planning, Diagnostics, Control, Documentation</p>
    </SectionedPage>
  </template>
};

export const Details: StoryObj = {
  render: () => <template>
    <SectionedPage @title="Training">
      <:title>Training</:title>
      <:description>Ways of organizing your practice</:description>
      <:content>
        <p>Planning, Diagnostics, Control, Documentation</p>
      </:content>
    </SectionedPage>
  </template>
};

export const Nested: StoryObj = {
  render: () => <template>
    <SectionedPage>
      <:title>Training</:title>
      <:description>Ways of organizing your practice</:description>
      <:nav as |Item|>
        {{! @glint-ignore }}
        <Item @link={{link "planning"}}>Planning</Item>
        {{! @glint-ignore }}
        <Item @link={{link "diagnostics"}}>Diagnostics</Item>
        {{! @glint-ignore }}
        <Item @link={{link "controlling"}}>Controlling</Item>
        {{! @glint-ignore }}
        <Item @link={{link "documentation"}}>Documentation</Item>
      </:nav>
      <:content>
        <Page @title="Planning">
          <p>Here about planning your practice in macro-, meso- and microcycles.</p>
        </Page>
      </:content>
    </SectionedPage>
  </template>
};
