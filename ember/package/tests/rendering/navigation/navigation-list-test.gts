import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { NavigationList } from '#src';
import { NavigationListPageObject } from '#test-support';
import Acorn from '~icons/ph/acorn';

module('Rendering | Navigation | <NavigationList>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(
      <template>
        <NavigationList>Look ma, I am here</NavigationList>
      </template>
    );

    const list = new NavigationListPageObject();

    assert.dom(list).exists();
    assert.dom(list).hasText('Look ma, I am here');
  });

  test('it renders with items', async (assert) => {
    await render(
      <template>
        <NavigationList as |n|>
          <n.Item>First</n.Item>
          <n.Item>Second</n.Item>
        </NavigationList>
      </template>
    );

    const list = new NavigationListPageObject();

    assert.dom(list).exists();
    assert.strictEqual(list.$items.length, 2);

    assert.dom(list.$items[0]).hasText('First');
    assert.dom(list.$items[1]).hasText('Second');
  });

  test('items can have icons', async (assert) => {
    await render(
      <template>
        <NavigationList as |n|>
          <n.Item @icon={{Acorn}}>First</n.Item>
        </NavigationList>
      </template>
    );

    const list = new NavigationListPageObject();

    assert.dom(list).exists();
    assert.dom(list.$items[0]?.$icon).exists();
  });

  test('it renders with items + title', async (assert) => {
    await render(
      <template>
        <NavigationList as |n|>
          <n.Item>First</n.Item>
          <n.Item>Second</n.Item>
          <n.Title>Title</n.Title>
          <n.Item>Third</n.Item>
        </NavigationList>
      </template>
    );

    const list = new NavigationListPageObject();

    assert.dom(list).exists();
    assert.strictEqual(list.$items.length, 3);
    assert.strictEqual(list.$titles.length, 1);
  });
});
