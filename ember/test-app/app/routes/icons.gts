import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import Unicycle from '~icons/custom/unicycle';
import Acorn from '~icons/ph/acorn';
import Pulse from '~icons/ph/pulse';

import { Icon, Page } from '@hokulea/ember';

export class ActionsRoute extends Route<object> {
  <template>
    <Page @title="Icons">

      <p>
        <Icon @icon={{Pulse}} />
        with some text
        <Icon @icon={{Acorn}} />
        and the best icon in the world:
        <Icon @icon={{Unicycle}} />
        A Unicycle
      </p>
    </Page>
  </template>
}

export default CompatRoute(ActionsRoute);
