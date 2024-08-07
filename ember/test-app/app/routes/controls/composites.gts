import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Page, Section } from '@hokulea/ember';

import ListComposite from './-composites/list';
import MenuComposite from './-composites/menu';

export class ControlsRoute extends Route<object> {
  <template>
    <Page @title="Composites">
      <Section @title="List">
        <ListComposite />
      </Section>

      <Section @title="Menu">
        <MenuComposite />
      </Section>
    </Page>
  </template>
}

export default CompatRoute(ControlsRoute);
