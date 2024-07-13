import { hbs } from 'ember-cli-htmlbars';

import { icons } from '@phosphor-icons/core';

const iconNames = icons.map((entry) => entry.name);

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
    },
    style: {
      name: 'Style',
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
      control: {
        type: 'radio',
        labels: {
          thin: 'thin',
          light: 'light',
          regular: 'regular (default)',
          bold: 'bold',
          fill: 'fill',
          duotone: 'duotone'
        }
      }
    }
  }
};

/* Use signature args directly, once */
type IconArgs = Partial<IconSignature['Args']>;

const Template = (args: IconArgs) => {
  return {
    template: hbs`<Icon @icon={{this.icon}} @style={{this.style}}/>`,
    context: {
      ...args
    }
  };
};

export const Showcase = {
  render: Template.bind({}),
  args: {
    icon: 'acorn'
  }
};

export const WithText = {
  render: (args: IconArgs) => ({
    template: hbs`
      <p>
        <Icon @icon={{this.icon}} @style={{this.style}} />
        Text next to the icon
      </p>`,
    context: {
      ...args
    }
  }),
  args: {
    icon: 'acorn'
  }
};
