import { configure } from '@storybook/ember';

const loadStories = () => {
  const req = require.context('../stories', true, /\.js$/);

  return [
    // require.context('../node_modules/@matagi/buttons/stories', true, /\.js$/)
    // require.context('../../buttons/stories', true, /\.js$/)
    ...req.keys().map(name => req(name))
  ];
};

configure(loadStories, module);
