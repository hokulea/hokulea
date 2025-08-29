import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Layouts/Page',
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
