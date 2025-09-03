import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Graphics/Avatar',
  component: 'Avatar',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  },
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
};

interface AvatarArgs {
  src?: string | null;
  name?: string;
}

/* Use signature args directly, once */
const Template = (args: AvatarArgs) => {
  return {
    template: hbs`<Avatar @src={{this.src}} @name={{this.name}} />`,
    context: args
  };
};

export const Showcase = {
  render: Template.bind({}),
  args: {
    src: 'https://avatars.githubusercontent.com/u/283700?v=4',
    name: 'Thomas Gossmann'
  }
};
