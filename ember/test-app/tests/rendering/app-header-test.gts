import { render, triggerEvent } from '@ember/test-helpers';
import { click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { AppHeader } from '@hokulea/ember';

import { AppHeaderPageObject } from '@hokulea/ember/test-support';
import { linkFor, setupLink } from 'ember-link/test-support';

import { setContainerWidth } from '../-helpers';

module('Rendering | <AppHeader>', (hooks) => {
  setupRenderingTest(hooks);
  setupLink(hooks);

  test('it renders with defaults', async (assert) => {
    await render(<template><AppHeader /></template>);

    const appHeader = new AppHeaderPageObject();

    assert.dom(appHeader.element).exists();
    assert.dom(appHeader.$menu.element).doesNotExist();
  });

  test('brand can take a link', async (assert) => {
    const home = linkFor('some.route');

    home.onTransitionTo = () => assert.step('link clicked');

    await render(
      <template>
        <AppHeader @home={{home}}>
          <:brand>Home</:brand>
        </AppHeader>
      </template>
    );

    const appHeader = new AppHeaderPageObject();

    assert.dom(appHeader.element).exists();
    assert.dom(appHeader.$brand.element).exists();
    assert.dom(appHeader.$brand.element).hasTagName('a');

    // act
    await click(appHeader.$brand.element as HTMLElement);

    // assert
    assert.verifySteps(['link clicked']);
  });

  module('as Navbar', () => {
    test('it has brand, nav and aux blocks', async (assert) => {
      await render(
        <template>
          <AppHeader>
            <:brand>brand</:brand>
            <:nav>nav</:nav>
            <:aux>aux</:aux>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.dom(appHeader.$menu.element).doesNotExist();

      assert.dom(appHeader.$brand.element).exists();
      assert.dom(appHeader.$brand.element).hasText('brand');
      assert.dom(appHeader.$nav.element).exists();
      assert.dom(appHeader.$nav.element).hasText('nav');
      assert.dom(appHeader.$aux.element).exists();
      assert.dom(appHeader.$aux.element).hasText('aux');
    });

    test('a nav icon is invoked', async (assert) => {
      const push = sinon.spy();

      await render(
        <template>
          <AppHeader>
            <:nav as |m|>
              <m.Item @push={{push}}>Nav Item</m.Item>
            </:nav>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      await click(appHeader.$nav.$item[0].element as HTMLElement);

      assert.ok(push.calledOnce);
    });

    test('a subnav icon is invoked and menu is closed', async (assert) => {
      const push = sinon.spy();

      await render(
        <template>
          <AppHeader>
            <:nav as |n|>
              <n.Item>
                <:label>Let's go down</:label>
                <:menu as |m|>
                  <m.Item @push={{push}}>Nav Item</m.Item>
                </:menu>
              </n.Item>
            </:nav>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.notOk(appHeader.$nav.$item[0].expanded);

      await click(appHeader.$nav.$item[0].element as HTMLElement);
      assert.ok(appHeader.$nav.$item[0].expanded);

      // double fire click + pointerup
      // https://github.com/emberjs/ember-test-helpers/issues/267

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await click(appHeader.$nav.$item[0]?.$menu?.$item[0]?.element as HTMLElement);
      await triggerEvent(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        appHeader.$nav.$item[0]?.$menu?.$item[0]?.element as HTMLElement,
        'pointerup'
      );

      assert.notOk(appHeader.$nav.$item[0].expanded);
      assert.ok(push.calledOnce);
    });
  });

  module('as Popover', (popverHooks) => {
    setContainerWidth(popverHooks, 400);

    test('it has brand, nav and aux blocks', async (assert) => {
      await render(
        <template>
          <AppHeader>
            <:brand>brand</:brand>
            <:nav>German to the rescue: Donaudampfschifffarhtskaptiänsbindenfüllfederhalter</:nav>
            <:aux>aux</:aux>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.dom(appHeader.$menu.element).exists();

      assert.dom(appHeader.$brand.element).exists();
      assert.dom(appHeader.$brand.element).hasText('brand');
      assert.dom(appHeader.$nav.element).exists();
      assert
        .dom(appHeader.$nav.element)
        .hasText('German to the rescue: Donaudampfschifffarhtskaptiänsbindenfüllfederhalter');

      assert.dom(appHeader.$aux.element).exists();
      assert.dom(appHeader.$aux.element).hasText('aux');
    });

    test('toggle the popover', async (assert) => {
      await render(
        <template>
          <AppHeader>
            <:brand>brand</:brand>
            <:nav>German to the rescue: Donaudampfschifffarhtskaptiänsbindenfüllfederhalter</:nav>
            <:aux>aux</:aux>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.notOk(appHeader.$menu.$popover.expanded);

      await click(appHeader.$menu?.$toggle?.element as HTMLElement);
      assert.ok(appHeader.$menu.$popover.expanded);

      await click(appHeader.$menu?.$toggle?.element as HTMLElement);
      assert.notOk(appHeader.$menu.$popover.expanded);
    });

    test('a nav icon is invoked and closes the menu', async (assert) => {
      const push = sinon.spy();

      await render(
        <template>
          <AppHeader>
            <:brand>Donaudampfschifffarhtskaptiänsbindenfüllfederhalter</:brand>
            <:nav as |m|>
              <m.Item @push={{push}}>Very long Nav Item</m.Item>
            </:nav>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.dom(appHeader.$menu.element).exists();
      assert.notOk(appHeader.$menu.$popover.expanded);

      await click(appHeader.$menu?.$toggle?.element as HTMLElement);
      assert.ok(appHeader.$menu.$popover.expanded);

      await click(appHeader.$nav.$item[0].element as HTMLElement);
      assert.ok(push.calledOnce);
      assert.notOk(appHeader.$menu.$popover.expanded);
    });

    test('toggle submenus', async (assert) => {
      await render(
        <template>
          <AppHeader>
            <:brand>Donaudampfschifffarhtskaptiänsbindenfüllfederhalter</:brand>
            <:nav as |l1|>
              <l1.Item>
                <:label>Level 1</:label>
                <:menu as |l2|>
                  <l2.Item>Level 2</l2.Item>
                </:menu>
              </l1.Item>
            </:nav>
          </AppHeader>
        </template>
      );

      const appHeader = new AppHeaderPageObject();

      assert.dom(appHeader.$menu.element).exists();
      assert.notOk(appHeader.$menu.$popover.expanded);

      await click(appHeader.$menu?.$toggle?.element as HTMLElement);
      assert.ok(appHeader.$menu.$popover.expanded);

      assert.notOk(appHeader.$nav.$item[0].expanded);

      await click(appHeader.$nav.$item[0].element as HTMLElement);
      assert.ok(appHeader.$nav.$item[0].expanded);
    });
  });
});
