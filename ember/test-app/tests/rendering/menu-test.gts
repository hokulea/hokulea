import { tracked } from '@glimmer/tracking';
import { array } from '@ember/helper';
import { focus, render, rerender, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Menu } from '@hokulea/ember';

import { MenuPageObject } from '@hokulea/ember/test-support';
import {
  testMenuKeyboardNavigation,
  testMenuPointerNavigation
} from 'ember-aria-voyager/test-support';

import { RefactorMenuFactory } from './-menu';

import type { MenuItem } from '@hokulea/ember/test-support/page-objects/-menu';

module('Rendering | <Menu>', function (hooks) {
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
