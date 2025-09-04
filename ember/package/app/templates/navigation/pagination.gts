import { array } from '@ember/helper';

import { Page, Pagination } from '#src';

<template>
  <Page @title="Pagination">
    <Pagination @pageSize={{10}} />
    <Pagination @pageSize={{10}} @pageSizes={{array 10 20 30}} />
  </Page>
</template>
