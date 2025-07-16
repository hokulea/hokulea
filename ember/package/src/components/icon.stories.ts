import { hbs } from 'ember-cli-htmlbars';

import { getIconSvg, listIcons } from './-stories';

const iconNames = listIcons();

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
type IconArgs = IconSignature['Args'];

const Template = (args: IconArgs) => {
  return {
    template: hbs`<Icon @icon={{this.icon}} />`,
    context: {
      icon: getIconSvg(args.icon)
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
        <Icon @icon={{this.icon}} />
        Text next to the icon
      </p>`,
    context: {
      icon: getIconSvg(args.icon)
    }
  }),
  args: {
    icon: 'acorn'
  }
};
