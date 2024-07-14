import { link } from 'ember-link';
import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { AppHeader } from '@hokulea/ember';

function noop() {
  // eslint-disable-next-line no-console
  console.log('noop');
}

export class ApplicationRoute extends Route<object> {
  <template>
    <AppHeader @position="center" @home={{link "application"}}>
      <:brand>Hokulea</:brand>
      <:nav as |n|>
        <n.Item @push={{link "actions"}}>Actions</n.Item>
        <n.Item @push={{link "content"}}>Content</n.Item>
        <n.Item>lalala</n.Item>
        <n.Item @push={{link "controls"}}>Controls</n.Item>
        <n.Item @push={{link "forms"}}>Forms</n.Item>
        <n.Item @push={{link "icons"}}>Icons</n.Item>
        <n.Item @push={{link "windows"}}>Windows</n.Item>
        <n.Item>
          <:label>Let's go down</:label>
          <:menu as |m|>
            <m.Item>One</m.Item>
            <m.Item @push={{noop}}>Two</m.Item>
            <m.Item>Three</m.Item>
            <m.Item>
              <:label>Down down</:label>
              <:menu as |mm|>
                <mm.Item>2. One Larger text</mm.Item>
                <mm.Item>2. Two</mm.Item>
              </:menu>
            </m.Item>
          </:menu>
        </n.Item>
      </:nav>
      <:aux>
        at the end
      </:aux>
    </AppHeader>

    {{outlet}}
  </template>
}

export default CompatRoute(ApplicationRoute);
