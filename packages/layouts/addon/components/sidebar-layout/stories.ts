import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Layouts/Sidebar',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
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
    base: args.base,
    min: args.min,
    left: args.position === 'left',
    right: args.position === 'right'
  }
});

Default.argTypes = {
  base: {
    defaultValue: '300px',
    control: { type: 'text' }
  },
  min: {
    defaultValue: '50%',
    control: { type: 'text' }
  },
  position: {
    defaultValue: 'left',
    control: {
      type: 'inline-radio',
      options: ['left', 'right']
    }
  }
};
