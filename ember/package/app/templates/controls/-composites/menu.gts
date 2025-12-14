import { link } from 'ember-link';

import { Button, Icon, Menu, popover } from '#src';
import PhHouse from '~icons/ph/house';
import PhIdentificationCard from '~icons/ph/identification-card';
import PhShoppingCart from '~icons/ph/shopping-cart';
import PhTreeView from '~icons/ph/tree-view';

import type { TOC } from '@ember/component/template-only';

function noop() {
  // return () => {
  console.log('noop');
  // };
}

const MenuComposite: TOC<object> = <template>
  <div class="with-controls">
    <p>
      <Menu as |m|>
        <m.Item @push={{noop}}><Icon @icon={{PhHouse}} /> Home</m.Item>
        <m.Item><Icon @icon={{PhIdentificationCard}} />About</m.Item>
        <m.Item>
          <:label><Icon @icon={{PhTreeView}} /> Nested</:label>
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
        <m.Item><Icon @icon={{PhShoppingCart}} /> Products</m.Item>
      </Menu>
    </p>

    <p>
      {{#let (popover position="bottom-start") as |p|}}
        <Button {{p.trigger}}>Toggle Menu</Button>
        <Menu {{p.target}} as |m|>
          <m.Item @push={{noop}}><Icon @icon={{PhHouse}} /> Home</m.Item>
          <m.Item @push={{link "actions"}}>Actions</m.Item>
          <m.Item>
            <:label><Icon @icon={{PhTreeView}} /> Nested</:label>
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
