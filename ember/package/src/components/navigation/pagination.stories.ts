import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Navigation/Pagination',
  component: 'Pagination',
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
  render: (args: {
    pageSize: number;
    pageSizes?: number[];
    page?: number;
    totalItems?: number;
  }) => ({
    template: hbs`
      <Pagination @pageSize={{this.pageSize}} @pageSizes={{this.pageSizes}} @page={{this.page}} @totalItems={{this.totalItems}} @change={{this.change}}/>
    `,
    context: {
      ...args,
      change: action('change')
    }
  }),
  argTypes: {
    pageSize: {
      control: { type: 'number' }
    },
    pageSizes: {
      control: { type: 'array' }
    },
    page: {
      control: { type: 'number' }
    },
    totalItems: {
      control: { type: 'number' }
    }
  },
  args: {
    pageSize: 10
  }
};
