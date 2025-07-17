import RouteTemplate from 'ember-route-template';

import { Icon, Page } from '#src';
import Unicycle from '~icons/custom/unicycle';
import Acorn from '~icons/ph/acorn';
import Pulse from '~icons/ph/pulse';

export default RouteTemplate(
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
);
