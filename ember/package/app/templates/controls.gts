import { link } from 'ember-link';
import RouteTemplate from 'ember-route-template';

import { Page } from '#src';

export default RouteTemplate(
  <template>
    <Page @title="Controls" @description="Simple Inputs and Complex Composites">
      <:nav as |Item|>
        <Item @link={{link "controls.index"}}>Inputs</Item>
        <Item @link={{link "controls.composites"}}>Composites</Item>
      </:nav>
      <:content>
        {{outlet}}
      </:content>
    </Page>
  </template>
);
