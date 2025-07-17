import { link } from 'ember-link';

import { Button, Menu, popover } from '@hokulea/ember';

import type { TOC } from '@ember/component/template-only';

function noop() {
  return () => {
    console.log('noop');
  };
}

const MenuComposite: TOC<object> = <template>
  <style>
    .with-controls {
      display: grid;
      grid-template-columns: auto 45%;
      gap: 1rem;
    }
  </style>
  <div class="with-controls">
    <p>
      <Menu as |m|>
        <m.Item @push={{noop}}>Home</m.Item>
        <m.Item>About</m.Item>
        <m.Item>
          <:label>Nested</:label>
          <:menu as |nm|>
            <nm.Item>Nested 1</nm.Item>
            <nm.Item>
              <:label>Nested 2</:label>
              <:menu as |nnm|>
                <nnm.Item>Nested 2.1</nnm.Item>
              </:menu>
            </nm.Item>
          </:menu>
        </m.Item>
        <m.Item>Products</m.Item>
      </Menu>
    </p>

    <p>
      {{#let (popover position="bottom-start") as |p|}}
        <Button {{p.trigger}}>Toggle Menu</Button>
        <Menu {{p.target}} as |m|>
          <m.Item @push={{noop}}>Home</m.Item>
          <m.Item @push={{link "actions"}}>Actions</m.Item>
          <m.Item>
            <:label>Nested</:label>
            <:menu as |nm|>
              <nm.Item>Nested 1</nm.Item>
              <nm.Item>
                <:label>Nested 2</:label>
                <:menu as |nnm|>
                  <nnm.Item>Nested 2.1</nnm.Item>
                </:menu>
              </nm.Item>
            </:menu>
          </m.Item>
          <m.Item @push={{link "controls"}}>Controls</m.Item>
        </Menu>
      {{/let}}
    </p>
  </div>
</template>;

export default MenuComposite;
