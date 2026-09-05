import { Pagination } from '../navigation/pagination.gts';
import { DataTable } from './data-table.gts';

import type { Meta, StoryObj } from 'ember-storybook';

const header = [
  {
    name: 'givenName',
    content: 'Given Name'
  },
  {
    name: 'familyName',
    content: 'Family Name'
  },
  {
    name: 'lightsaber',
    content: 'Lightsaber'
  }
];

const rows = [
  {
    givenName: 'Anakin',
    familyName: 'Skywalker',
    lightsaber: 'blue'
  },
  {
    givenName: 'Obi Wan',
    familyName: 'Kenobi',
    lightsaber: 'green'
  },
  {
    givenName: 'Ahsoka',
    familyName: 'Tano',
    lightsaber: 'white'
  }
];

export default {
  title: 'Data/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

export const Basic: StoryObj = {
  render: () => <template><DataTable @header={{header}} @rows={{rows}} /></template>
};

export const WithPagination: StoryObj = {
  render: () => <template>
    <DataTable @header={{header}} @rows={{rows}}>
      <:pagination>
        <Pagination @pageSize={{10}} />
      </:pagination>
    </DataTable>
  </template>
};
