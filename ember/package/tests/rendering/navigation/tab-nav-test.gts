import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { TabNav } from '#src';
import { TabNavPageObject } from '#test-support';
import Acorn from '~icons/ph/acorn';

module('Rendering | Navigation | <TabNav>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(
      <template>
        <TabNav>Look ma, I am here</TabNav>
      </template>
    );

    const list = new TabNavPageObject();

    assert.dom(list).exists();
    assert.dom(list).hasText('Look ma, I am here');
  });

  test('it renders with items', async (assert) => {
    await render(
      <template>
        <TabNav as |n|>
          <n.Item>First</n.Item>
          <n.Item>Second</n.Item>
        </TabNav>
      </template>
    );

    const list = new TabNavPageObject();

    assert.dom(list).exists();
    assert.strictEqual(list.$items.length, 2);

    assert.dom(list.$items[0]).hasText('First');
    assert.dom(list.$items[1]).hasText('Second');
  });

  test('items can have icons', async (assert) => {
    await render(
      <template>
        <TabNav as |n|>
          <n.Item @icon={{Acorn}}>First</n.Item>
        </TabNav>
      </template>
    );

    const list = new TabNavPageObject();

    assert.dom(list).exists();
    assert.dom(list.$items[0]?.$icon).exists();
  });
});
