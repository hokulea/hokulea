import { hbs } from 'ember-cli-htmlbars';

import { IconName, StyleName } from '@hokulea/icons';

import type { IconNames, StyleNames } from '@hokulea/icons';

// import type { IconSignature } from './icon';
interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /** Name of the icon */
    icon: IconName | IconNames;
    style?: StyleName | StyleNames;
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
      options: Object.values(IconName).sort(),
      control: 'select'
    },
    style: {
      name: 'Style',
      options: Object.values(StyleName),
      control: {
        type: 'radio',
        labels: {
          [StyleName.Regular]: 'regular (default)',
          [StyleName.Filled]: 'filled'
        }
      }
    }
  }
};

/* Use signature args directly, once */
type IconArgs = Partial<IconSignature['Args']>;

const Template = (args: IconArgs) => {
  return {
    template: hbs`
    <Icon
      @icon={{this.icon}}
      @style={{this.style}}
    />
  `,
    context: {
      ...args
    }
  };
};

export const Default = Template.bind({});
Default.args = {
  icon: IconName.Placeholder
};

export const WithText = (args: IconArgs) => ({
  template: hbs`
    <p>
      <Icon
        @icon={{this.icon}}
        @style={{this.style}}
      />
      Text next to the icon
    </p>`,
  context: {
    ...args
  }
});
WithText.args = {
  icon: IconName.Add
};
