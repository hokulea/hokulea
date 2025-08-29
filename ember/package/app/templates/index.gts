import { link } from 'ember-link';
import RouteTemplate from 'ember-route-template';

import { Page, SectionedPage } from '#src';

export default RouteTemplate(
  <template>
    <SectionedPage @title="Page" @description="a little explanation">
      <:nav as |Link|>
        <Link @link={{link "index"}}>Index</Link>
        nav
      </:nav>
      <:content>
        <Page @title="Content Area" @description="a second explanation">
          A subpage

        </Page>
      </:content>
    </SectionedPage>
  </template>
);
