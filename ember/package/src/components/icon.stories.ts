import { hbs } from 'ember-cli-htmlbars';

import iconTags from 'lucide-static/tags.json';

const iconNames = Object.keys(iconTags);

// import type { IconSignature } from './icon';
interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /** Name of the icon */
    icon: string;
  };
}

export default {
  title: 'Components/Icons/Icon',
  component: 'icon',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  },
  argTypes: {
    icon: {
      name: 'Icon',
      options: iconNames.sort(),
      control: 'select'
    }
  }
};

/* Use signature args directly, once */
type IconArgs = Partial<IconSignature['Args']>;

const Template = (args: IconArgs) => {
  return {
    template: hbs`<Icon @icon={{this.icon}}/>`,
    context: {
      ...args
    }
  };
};

export const Default = {
  render: Template.bind({}),
  args: {
    icon: 'activity'
  }
};

export const WithText = {
  render: (args: IconArgs) => ({
    template: hbs`
      <p>
        <Icon @icon={{this.icon}} />
        Text next to the icon
      </p>`,
    context: {
      ...args
    }
  }),
  args: {
    icon: 'activity'
  }
};
