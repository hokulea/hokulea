import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { array } from '@ember/helper';

import { Page, Pagination } from '#src';

export default class PaginationRoute extends Component {
  @tracked page = 1;
  @tracked pageSize = 10;

  change = ({ page, pageSize }: { page: number; pageSize: number }) => {
    this.page = page;
    this.pageSize = pageSize;
  };

  <template>
    <Page @title="Pagination">
      <Pagination
        @pageSize={{this.pageSize}}
        @change={{this.change}}
        @page={{this.page}}
        @totalItems={{1024}}
      />
      <Pagination @pageSize={{this.pageSize}} @change={{this.change}} @page={{this.page}} />
      <Pagination
        @pageSize={{this.pageSize}}
        @change={{this.change}}
        @page={{this.page}}
        @totalItems={{104}}
      />
      <Pagination
        @pageSize={{this.pageSize}}
        @change={{this.change}}
        @page={{this.page}}
        @pageSizes={{array 10 20 30}}
      />

    </Page>
  </template>
}
