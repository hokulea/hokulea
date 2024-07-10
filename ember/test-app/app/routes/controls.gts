import { link } from 'ember-link';
import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Page } from '@hokulea/ember';

export class ControlsRoute extends Route<object> {
  <template>
    <Page @title="Controls">
      <:nav as |Item|>
        <Item @link={{link "controls.index"}}>Inputs</Item>
        <Item @link={{link "controls.composites"}}>Composites</Item>
      </:nav>
      <:content>
        {{outlet}}
      </:content>
    </Page>
  </template>
}

export default CompatRoute(ControlsRoute);
