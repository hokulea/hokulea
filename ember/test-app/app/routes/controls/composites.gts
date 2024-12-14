import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Page, Tabs } from '@hokulea/ember';

import ListComposite from './-composites/list';
import MenuComposite from './-composites/menu';

export class ControlsRoute extends Route<object> {
  <template>
    <Page @title="Composites">
      <Tabs as |t|>
        <t.Tab @label="List">
          <ListComposite />
        </t.Tab>

        <t.Tab @label="Menu">
          <MenuComposite />
        </t.Tab>
      </Tabs>
    </Page>
  </template>
}

export default CompatRoute(ControlsRoute);
