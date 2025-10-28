import { array } from '@ember/helper';

import { DataTable, Page, Pagination } from '#src';

import type { TOC } from '@ember/component/template-only';

const Tag: TOC<{ Blocks: { default: [] } }> = <template>
  <style scoped>
    .tag {
      padding: 0.25em;

      font-size: 80%;
      font-weight: 500;
      color: var(--typography-code-text);
      white-space: nowrap;

      background-color: hsl(from var(--typography-code-background) h s calc(l - 3));
      border-radius: 4px;
    }
  </style>
  <span class="tag" ...attributes>{{yield}}</span>
</template>;

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
    lightsaber: <template>
      <Tag>blue</Tag>
    </template>
  },
  {
    givenName: 'Obi Wan',
    familyName: 'Kenobi',
    lightsaber: <template>
      <Tag>green</Tag>
    </template>
  },
  {
    givenName: 'Ahsoka',
    familyName: 'Tano',
    lightsaber: <template>
      <Tag>white</Tag>
    </template>
  }
];

<template>
  <Page @title="Data">
    <DataTable @header={{header}} @rows={{rows}}>
      <:pagination>
        <Pagination @pageSize={{10}} @pageSizes={{array 10 20 30}} />
      </:pagination>
    </DataTable>
  </Page>
</template>
