import { tracked } from '@glimmer/tracking';
import { array } from '@ember/helper';
import { focus, render, rerender, triggerEvent, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Menu } from '#src';
import { MenuPageObject } from '#test-support';

import {
  testMenuKeyboardNavigation,
  testMenuPointerNavigation
} from 'ember-aria-voyager/test-support';

import { RefactorMenuFactory } from './-menu.gts';

import type { MenuCheckItem, MenuItem } from '#test-support/page-objects/-menu.ts';

module('Rendering | Controls | <Menu>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><Menu /></template>);

    const menu = new MenuPageObject();

    assert.dom(menu.control).exists();
    assert.dom(menu.control).doesNotHaveAria('disabled');
  });

  test('html attributes work', async function (assert) {
    await render(<template><Menu dir="ltr" /></template>);

    const menu = new MenuPageObject();

    assert.dom(menu.control).hasAttribute('dir', 'ltr');
  });

  test('disabling the menu', async function (assert) {
    await render(<template><Menu @disabled={{true}} /></template>);

    const menu = new MenuPageObject();

    assert.dom(menu.control).hasAria('disabled', 'true');
  });

  test('renders items', async function (assert) {
    await render(
      <template>
        <Menu as |m|>
          {{#each (array "Banana" "Apple" "Pear") as |item|}}
            <m.Item>{{item}}</m.Item>
          {{/each}}
        </Menu>
      </template>
    );

    const menu = new MenuPageObject();

    assert.dom(menu.$item[0]).hasText('Banana');
    assert.dom(menu.$item[1]).hasText('Apple');
    assert.dom(menu.$item[2]).hasText('Pear');
  });

  test('renders item options', async function (assert) {
    const context = new (class {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      @tracked disabled = false;
    })();

    await render(
      <template>
        <Menu as |m|>
          <m.Item>First</m.Item>
          <m.Item @disabled={{context.disabled}}>Second</m.Item>
          <m.Item>Third</m.Item>
        </Menu>
      </template>
    );

    const menu = new MenuPageObject();

    assert.dom(menu.$item[1]).hasAria('disabled', 'false', 'Second item is not disabled');

    // stepping over items
    await focus(menu.$item[0] as MenuItem);
    assert.dom(menu.$item[0]).hasAttribute('tabindex', '0', 'Focus the first item');

    await triggerKeyEvent(menu, 'keydown', 'ArrowDown');
    assert.dom(menu.$item[1]).hasAttribute('tabindex', '0', '`ArrowDown` to activate second item');

    await triggerKeyEvent(menu, 'keydown', 'ArrowDown');
    assert.dom(menu.$item[2]).hasAttribute('tabindex', '0', '`ArrowDown` to activate third item');

    context.disabled = true;

    await rerender();

    assert.dom(menu.$item[1]).hasAria('disabled', 'true', 'Second item is disabled');

    await triggerKeyEvent(menu, 'keydown', 'Home');
    assert.dom(menu.$item[0]).hasAttribute('tabindex', '0', '`Home` to activate the first item');

    await triggerKeyEvent(menu, 'keydown', 'ArrowDown');
    assert.dom(menu.$item[2]).hasAttribute('tabindex', '0', '`ArrowDown` to activate third item');
  });

  module('Checkbox items', function () {
    test('renders checkbox items', async function (assert) {
      await render(
        <template>
          <Menu as |m|>
            <m.Checkbox>English</m.Checkbox>
            <m.Checkbox>German</m.Checkbox>
            <m.Checkbox @checked={{true}}>Japanese</m.Checkbox>
            <m.Checkbox @disabled={{true}}>Klingon</m.Checkbox>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      assert.dom(menu.$checkbox[0]).hasText('English');
      assert
        .dom(menu.$checkbox[0])
        .hasAria('checked', 'false', 'checkboxes are unchecked by default');
      assert
        .dom(menu.$checkbox[2])
        .hasAria('checked', 'true', '`@checked` renders a checked checkbox');
      assert
        .dom(menu.$checkbox[3])
        .hasAria('disabled', 'true', '`@disabled` renders a disabled checkbox');
    });

    test('checkbox items toggle with keyboard', async function (assert) {
      const push = sinon.spy();

      await render(
        <template>
          <Menu as |m|>
            <m.Checkbox @push={{push}}>English</m.Checkbox>
            <m.Checkbox @push={{push}}>German</m.Checkbox>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      await focus(menu.$checkbox[0] as MenuCheckItem);
      await triggerKeyEvent(menu, 'keydown', ' ');

      assert
        .dom(menu.$checkbox[0])
        .hasAria('checked', 'true', '`Space` checks the active checkbox');
      assert.true(push.calledOnceWith(true), 'checked checkbox pushes its state');

      await triggerKeyEvent(menu, 'keydown', ' ');

      assert
        .dom(menu.$checkbox[0])
        .hasAria('checked', 'false', '`Space` again unchecks the checkbox');
      assert.true(push.calledWith(false), 'unchecked checkbox pushes its state');
    });

    test('checkbox items toggle with pointer', async function (assert) {
      const push = sinon.spy();

      await render(
        <template>
          <Menu as |m|>
            <m.Checkbox @push={{push}}>English</m.Checkbox>
            <m.Checkbox @push={{push}}>German</m.Checkbox>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      await triggerEvent(menu.$checkbox[0] as MenuCheckItem, 'pointerup');
      await triggerEvent(menu.$checkbox[1] as MenuCheckItem, 'pointerup');

      assert
        .dom(menu.$checkbox[0])
        .hasAria('checked', 'true', 'clicking checks the first checkbox');
      assert
        .dom(menu.$checkbox[1])
        .hasAria('checked', 'true', 'clicking checks the second checkbox');
      assert.true(push.calledTwice, 'only the toggled checkbox pushes its state');
      assert.true(push.calledWith(true), '... and pushes it as checked');

      await triggerEvent(menu.$checkbox[0] as MenuCheckItem, 'pointerup');

      assert.dom(menu.$checkbox[0]).hasAria('checked', 'false', 'clicking again unchecks it');
      assert.dom(menu.$checkbox[1]).hasAria('checked', 'true', 'the other checkbox stays checked');
      assert.true(push.calledThrice, 'unchecking pushes once more');
      assert.true(push.calledWith(false), '... and pushes it as unchecked');
    });
  });

  module('Radio items', function () {
    test('renders radio items', async function (assert) {
      await render(
        <template>
          <Menu as |m|>
            <m.Radio @value="en">English</m.Radio>
            <m.Radio @value="de">German</m.Radio>
            <m.Radio @value="ja">Japanese</m.Radio>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      assert.dom(menu.$radio[0]).hasText('English');
      assert
        .dom(menu.$radio[0])
        .hasAria('checked', 'true', 'the first radio of a group is checked');
      assert.dom(menu.$radio[1]).hasAria('checked', 'false');
      assert.dom(menu.$radio[2]).hasAria('checked', 'false');
    });

    test('radio items are initially selected by @value', async function (assert) {
      await render(
        <template>
          <Menu @value="de" as |m|>
            <m.Radio @value="en">English</m.Radio>
            <m.Radio @value="de">German</m.Radio>
            <m.Radio @value="ja">Japanese</m.Radio>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      assert.dom(menu.$radio[0]).hasAria('checked', 'false');
      assert.dom(menu.$radio[1]).hasAria('checked', 'true', '`@value` selects the matching radio');
      assert.dom(menu.$radio[2]).hasAria('checked', 'false');
    });

    test('radio items are selectable via keyboard', async function (assert) {
      const update = sinon.spy();

      await render(
        <template>
          <Menu @value="en" @update={{update}} as |m|>
            <m.Radio @value="en">English</m.Radio>
            <m.Radio @value="de">German</m.Radio>
            <m.Radio @value="ja">Japanese</m.Radio>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      assert.notOk(update.called, 'the setup does not invoke `@update`');

      await focus(menu.$radio[0] as MenuCheckItem);
      await triggerKeyEvent(menu, 'keydown', 'ArrowDown');
      await triggerKeyEvent(menu, 'keydown', ' ');

      assert.dom(menu.$radio[1]).hasAria('checked', 'true', '`Space` selects the active radio');
      assert.dom(menu.$radio[0]).hasAria('checked', 'false', '... and deselects the previous one');
      assert.true(update.calledOnceWith('de'), '`@update` receives the selected value');
    });

    test('radio items are selectable via pointer', async function (assert) {
      const update = sinon.spy();

      await render(
        <template>
          <Menu @value="en" @update={{update}} as |m|>
            <m.Radio @value="en">English</m.Radio>
            <m.Radio @value="de">German</m.Radio>
            <m.Radio @value="ja">Japanese</m.Radio>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      await triggerEvent(menu.$radio[2] as MenuCheckItem, 'pointerup');

      assert.dom(menu.$radio[2]).hasAria('checked', 'true', 'clicking selects a radio item');
      assert.dom(menu.$radio[0]).hasAria('checked', 'false', '... and deselects the other one');
      assert.true(update.calledOnceWith('ja'), '`@update` receives the selected value');
    });

    test('radio groups select independently', async function (assert) {
      await render(
        <template>
          <Menu as |m|>
            <m.Group as |g|>
              <g.Radio @value="a">A</g.Radio>
              <g.Radio @value="b">B</g.Radio>
            </m.Group>
            <m.Group as |g|>
              <g.Radio @value="x">X</g.Radio>
              <g.Radio @value="y">Y</g.Radio>
            </m.Group>
          </Menu>
        </template>
      );

      const menu = new MenuPageObject();

      assert.dom('[role="group"]').exists({ count: 2 }, 'each `m.Group` renders a role="group"');

      assert
        .dom(menu.$radio[0])
        .hasAria('checked', 'true', 'the first radio of the first group is checked');
      assert
        .dom(menu.$radio[2])
        .hasAria('checked', 'true', 'the first radio of the second group is checked');

      await triggerEvent(menu.$radio[1] as MenuCheckItem, 'pointerup');

      assert.dom(menu.$radio[1]).hasAria('checked', 'true', 'clicking selects a radio');
      assert.dom(menu.$radio[0]).hasAria('checked', 'false', '... within its own group only');
      assert.dom(menu.$radio[2]).hasAria('checked', 'true', 'the other group is unaffected');
      assert.dom(menu.$radio[3]).hasAria('checked', 'false', 'the other group is unaffected');
    });
  });

  test('radio groups receive their own selection updates', async function (assert) {
    const update = sinon.spy();

    await render(
      <template>
        <Menu as |m|>
          <m.Group @value="a" @update={{update}} as |g|>
            <g.Radio @value="a">A</g.Radio>
            <g.Radio @value="b">B</g.Radio>
          </m.Group>
        </Menu>
      </template>
    );

    const menu = new MenuPageObject();

    assert.dom(menu.$radio[0]).hasAria('checked', 'true', 'the group `@value` seeds the selection');
    assert.notOk(update.called, 'the setup does not invoke `@update`');

    await triggerEvent(menu.$radio[1] as MenuCheckItem, 'pointerup');

    assert.dom(menu.$radio[1]).hasAria('checked', 'true', 'clicking selects a radio');
    assert.dom(menu.$radio[0]).hasAria('checked', 'false');
    assert.true(update.calledOnceWith('b'), 'the group reports its own selection via `@update`');
  });

  test('it supports keyboard navigation', async function (assert) {
    await render(
      <template>
        <button type="button" popovertarget="refactormenu">Refactor</button>

        <Menu id="refactormenu" popover as |m|>
          <RefactorMenuFactory @menu={{m}} />
        </Menu>
      </template>
    );

    await testMenuKeyboardNavigation(assert);
  });

  test('it supports pointer navigation', async function (assert) {
    await render(
      <template>
        <button type="button" popovertarget="refactormenu">Refactor</button>
        <Menu id="refactormenu" popover as |m|>
          <RefactorMenuFactory @menu={{m}} />
        </Menu>
      </template>
    );

    await testMenuPointerNavigation(assert);
  });
});
