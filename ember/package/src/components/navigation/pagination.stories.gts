import { action } from 'storybook/actions';

import { Pagination, type PaginationSignature } from './pagination.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type Args = PaginationSignature['Args'];

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

export const Showcase: StoryObj<Args> = {
  render: (args) => <template>
    <Pagination
      @pageSize={{args.pageSize}}
      @pageSizes={{args.pageSizes}}
      @page={{args.page}}
      @totalItems={{args.totalItems}}
      @change={{args.change}}
    />
  </template>,
  argTypes: {
    pageSize: {
      control: { type: 'number' }
    },
    pageSizes: {
      control: { type: 'object' }
    },
    page: {
      control: { type: 'number' }
    },
    totalItems: {
      control: { type: 'number' }
    }
  },
  args: {
    pageSize: 10,
    change: action('change')
  }
};
