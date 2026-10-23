import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { link } from 'ember-link';

import { Button, Icon, Menu, type MenuBuilder, popover } from '#src';
import PhHouse from '~icons/ph/house';
import PhIdentificationCard from '~icons/ph/identification-card';
import PhShoppingCart from '~icons/ph/shopping-cart';
import PhTreeView from '~icons/ph/tree-view';

import type { TOC } from '@ember/component/template-only';

function noop() {
  console.log('noop');
}

const DemoMenu: TOC<{ Args: { m: MenuBuilder } }> = <template>
  <@m.Item @push={{noop}}><Icon @icon={{PhHouse}} /> Home</@m.Item>
  <@m.Item><Icon @icon={{PhIdentificationCard}} /> About</@m.Item>
  <@m.Item>
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
  </@m.Item>
  <@m.Item><Icon @icon={{PhShoppingCart}} /> Products</@m.Item>
</template>;

class MenuComposite extends Component<object> {
  @tracked lang = 'en';

  selectLang = (lang: string | string[]) => {
    if (Array.isArray(lang)) {
      return;
    }

    this.lang = lang;
  };

  <template>
    <div class="with-controls">
      <p>
        <Menu as |m|>
          <DemoMenu @m={{m}} />
        </Menu>
      </p>

      <p>
        {{#let (popover position="bottom span-right" fallback="flip-block") as |p|}}
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

    <div>
      <p>
        <Menu as |m|>
          <m.Checkbox>English</m.Checkbox>
          <m.Checkbox>German</m.Checkbox>
          <m.Checkbox>Japanese</m.Checkbox>
        </Menu>
      </p>

      <p>
        <Menu @value={{this.lang}} @update={{this.selectLang}} as |m|>
          <m.Item>
            <:label>Options</:label>
            <:menu as |n|>
              <n.Checkbox>Status Bar</n.Checkbox>
              <n.Checkbox>Panel</n.Checkbox>
            </:menu>
          </m.Item>
          <hr />
          {{! {{!-- <m.Group  as |g|> }}
          <m.Radio @value="en">English</m.Radio>
          <m.Radio @value="de">German</m.Radio>
          <m.Radio @value="ja">Japanese</m.Radio>
          {{! </m.Group> }}
        </Menu>
      </p>
    </div>
  </template>
}

export default MenuComposite;
