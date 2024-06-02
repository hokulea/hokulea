import { link } from 'ember-link';
import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { AppHeader } from '@hokulea/ember';

export class ApplicationRoute extends Route<object> {
  <template>
    <AppHeader @position='center'>
      <:brand>Hokulea</:brand>
      <:nav as |Item|>
        <Item @push={{link 'actions'}}>Actions</Item>
        <Item @push={{link 'content'}}>Content</Item>
        <Item @push={{link 'controls'}}>Controls</Item>
        <Item @push={{link 'aria'}}>Aria</Item>
        <Item @push={{link 'forms'}}>Forms</Item>
        <Item @push={{link 'icons'}}>Icons</Item>
        <Item @push={{link 'navigation'}}>Navigation</Item>
        <Item>
          <:label>Let's go down</:label>
          <:menu as |m|>
            <m.Item>One</m.Item>
            <m.Item>Two</m.Item>
            <m.Item>Three</m.Item>
            <m.Item>
              <:label>Down down</:label>
              <:menu as |mm|>
                <mm.Item>2. One Larger text</mm.Item>
                <mm.Item>2. Two</mm.Item>
              </:menu>
            </m.Item>
          </:menu>
        </Item>
      </:nav>
      <:aux>
        at the end
      </:aux>
    </AppHeader>

    <main>
      {{outlet}}
    </main>
  </template>
}

export default CompatRoute(ApplicationRoute);
