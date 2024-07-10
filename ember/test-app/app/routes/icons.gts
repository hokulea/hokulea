import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Icon, Page } from '@hokulea/ember';

export class ActionsRoute extends Route<object> {
  <template>
    <Page @title="Icons">

      <p>
        <Icon @icon="activity" />
        with some text and the best icon in the world:
        <Icon @icon="unicycle" />
        A Unicycle
      </p>
    </Page>
  </template>
}

export default CompatRoute(ActionsRoute);
