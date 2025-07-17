import { link } from 'ember-link';
import RouteTemplate from 'ember-route-template';

import { Page } from '#src';

export default RouteTemplate(
  <template>
    <Page @title="Page" @description="a little explanation">
      <:nav as |Link|>
        <Link @link={{link "index"}}>Index</Link>
        nav
      </:nav>
      <:content>
        <Page @title="Content Area" @description="a second explanation">
          A subpage
        </Page>
      </:content>
    </Page>
  </template>
);
