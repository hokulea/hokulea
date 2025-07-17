import RouteTemplate from 'ember-route-template';

import { Page, Tabs } from '#src';

import ListComposite from './-composites/list';
import MenuComposite from './-composites/menu';
import TabsComposite from './-composites/tabs';

export default RouteTemplate(
  <template>
    <Page @title="Composites">
      <Tabs as |t|>
        <t.Tab @label="List">
          <ListComposite />
        </t.Tab>

        <t.Tab @label="Menu">
          <MenuComposite />
        </t.Tab>

        <t.Tab @label="Tabs">
          <TabsComposite />
        </t.Tab>
      </Tabs>
    </Page>
  </template>
);
