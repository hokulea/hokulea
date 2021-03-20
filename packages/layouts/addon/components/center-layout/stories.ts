import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Layouts/Center',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = args => ({
  template: hbs`
    <CenterLayout @intrinsic={{this.intrinsic}} @text={{this.text}}>
      <p>Hello text</p>
    </CenterLayout>
  `,
  context: {
    intrinsic: args.intrinsic,
    text: args.text
  }
});

Default.argTypes = {
  intrinsic: {
    defaultValue: false,
    control: { type: 'boolean' }
  },
  text: {
    defaultValue: false,
    control: { type: 'boolean' }
  }
};
