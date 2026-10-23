import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Data/DataTable',
  component: 'DataTable',
  parameters: {
    options: {
      showPanel: false,
      isToolshown: true
    },
    layout: 'fullscreen'
  },
  controls: { hideNoControlsWarning: true }
};

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

export const Basic = {
  render: () => ({
    template: hbs`
      <DataTable @header={{this.header}} @rows={{this.rows}} />
    `,
    context: {
      header,
      rows
    }
  })
};

export const WithPagination = {
  render: () => ({
    template: hbs`
      <DataTable @header={{this.header}} @rows={{this.rows}}>
        <:pagination>
          <Pagination @pageSize={{10}} />
        </:pagination>
      </DataTable>
    `,
    context: {
      header,
      rows
    }
  })
};
