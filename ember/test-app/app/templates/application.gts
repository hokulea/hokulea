import { link } from 'ember-link';
import RouteTemplate from 'ember-route-template';

import { AppHeader } from '@hokulea/ember';

function noop() {
  console.log('noop');
}

export default RouteTemplate(
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
            <m.Item @push={{link "actions"}}>Actions</m.Item>
            <m.Item @push={{link "content"}}>Content</m.Item>
            <hr />
            <m.Item @push={{noop}}>lalala</m.Item>
            <hr />
            <m.Item @push={{link "controls"}}>Controls</m.Item>
            <m.Item @push={{link "forms"}}>Forms</m.Item>
            <m.Item @push={{link "icons"}}>Icons</m.Item>
            <m.Item @push={{link "windows"}}>Windows</m.Item>
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
);
