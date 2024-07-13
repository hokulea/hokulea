import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Icon } from '@hokulea/ember';

import { IconPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Icon>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(<template><Icon @icon="acorn" /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.strictEqual(icon.name, 'acorn');
    assert.strictEqual(icon.style, 'regular');
  });

  test('with different style', async (assert) => {
    await render(<template><Icon @icon="acorn" @style="thin" /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.strictEqual(icon.name, 'acorn');
    assert.strictEqual(icon.style, 'thin');
  });

  test('with custom icon', async (assert) => {
    await render(<template><Icon @icon="unicycle" /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.strictEqual(icon.name, 'unicycle');
    assert.strictEqual(icon.style, 'custom');
  });
});
