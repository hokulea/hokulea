import { hbs } from 'ember-cli-htmlbars';

import { radios, text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components|Layouts/Sidebar',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => {
  return {
    template: hbs`
      <SidebarLayout @min={{this.min}} as |s|>
        {{#if this.left}}
          <BoxLayout {{style flexBasis=(if this.base this.base "")}}>
            Side
          </BoxLayout>
        {{/if}}
        <BoxLayout class={{s.contentClass}}>
          Only Content
        </BoxLayout>
        {{#if this.right}}
          <BoxLayout {{style flexBasis=(if this.base this.base "")}}>
            Side
          </BoxLayout>
        {{/if}}
      </SidebarLayout>`,
    context: {
      get base() {
        return text('base', '300px');
      },

      get min() {
        return text('min', '50%');
      },

      get left() {
        return (
          radios(
            'position',
            {
              left: 'left',
              right: 'right'
            },
            'left'
          ) === 'left'
        );
      },

      get right() {
        return !this.left;
      }
    }
  };
};

Default.story = {
  decorators: [withKnobs]
};
