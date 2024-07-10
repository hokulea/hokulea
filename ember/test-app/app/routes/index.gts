import { link } from 'ember-link';
import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Page } from '@hokulea/ember';

export class ActionsRoute extends Route<object> {
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
}

export default CompatRoute(ActionsRoute);
