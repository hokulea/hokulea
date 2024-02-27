import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Icon } from '@hokulea/ember';

export class ActionsRoute extends Route<{}> {
  <template>
    <h2>Icons</h2>

    <p>
      <Icon @icon='activity' />
      with some text and the best icon in the world:
      <Icon @icon='unicycle' />
      A Unicycle
    </p>
  </template>
}

export default CompatRoute(ActionsRoute);
