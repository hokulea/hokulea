import { action } from 'storybook/actions';

import { Pagination, type PaginationSignature } from './pagination.gts';

import type { Meta, StoryObj } from 'ember-storybook';

type Args = PaginationSignature['Args'];

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
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
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

export const Showcase: StoryObj<Args> = {
  args: {
    pageSize: 10,
    change: action('change')
  }
};
