import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Navigation/Link',
  component: 'Link',
  parameters: {
    options: {
      showPanel: false,
      isToolshown: true
    },
    layout: 'fullscreen'
  },
  controls: { hideNoControlsWarning: true }
};

export const Showcase = {
  render: () => ({
    template: hbs`
      <Link @href="http://gos.si">gos.si</Link>
    `
  })
};
