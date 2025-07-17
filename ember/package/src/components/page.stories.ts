import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Layout/Page',
  component: 'page',
  parameters: {
    options: {
      showPanel: false,
      showToolbar: true
    },
    layout: 'fullscreen'
  }
};

export const Showcase = {
  render: (args: object) => ({
    template: hbs`
      <Page @title={{this.title}} @description={{this.description}}>
        <p>{{this.content}}</p>
      </Page>
    `,
    context: args
  }),
  args: {
    title: 'Heading',
    content: 'Hello World'
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
};

export const Simple = () => {
  return {
    template: hbs`
      <Page @title="Training">
        <p>Planning, Diagnostics, Control, Documentation</p>
      </Page>
    `
  };
};

export const Details = () => {
  return {
    template: hbs`
      <Page @title="Training">
        <:title>Training</:title>
        <:description>Ways of organizing your practice</:description>
        <:content>
          <p>Planning, Diagnostics, Control, Documentation</p>
        </:content>
      </Page>
    `
  };
};

export const Nested = () => {
  return {
    template: hbs`
      <Page>
        <:title>Training</:title>
        <:description>Ways of organizing your practice</:description>
        <:nav as |Item|>
          <Item @link={{this.link 'planning'}}>Planning</Item>
          <Item @link={{this.link 'diagnostics'}}>Diagnostics</Item>
          <Item @link={{this.link 'controlling'}}>Controlling</Item>
          <Item @link={{this.link 'documentation'}}>Documentation</Item>
        </:nav>
        <:content>
          <Page @title="Planning">
            <p>Here about planning your practice in macro-, meso- and microcycles.</p>
          </Page>
        </:content>
      </Page>
    `,
    context: {
      link: (name: string) => {
        return {
          url: name,
          open: (e: MouseEvent) => {
            action('open link')(name);
            e.preventDefault();
          },
          isActive: name === 'planning'
        };
      }
    }
  };
};
