import { link } from 'ember-link';
import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Button, Menu, popover } from '@hokulea/ember';

const noop = () => {
  // eslint-disable-next-line no-console
  console.log('noop');
};

export class NavigationRoute extends Route<object> {
  <template>
    <h2>Navigation</h2>

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
      {{#let (popover position='bottom-start') as |p|}}
        <Button {{p.trigger}}>Toggle Menu</Button>
        <Menu {{p.target}} as |m|>
          <m.Item @push={{noop}}>Home</m.Item>
          <m.Item @push={{link 'actions'}}>Actions</m.Item>
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
          <m.Item @push={{link 'controls'}}>Controls</m.Item>
        </Menu>
      {{/let}}
    </p>
  </template>
}

export default CompatRoute(NavigationRoute);
