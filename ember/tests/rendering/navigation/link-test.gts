import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Link } from '#src';

module('Rendering | Navigation | <Link>', function (hooks) {
  setupRenderingTest(hooks);

  test('internal links', async (assert) => {
    await render(
      <template>
        <Link @href="/navigation">Navigation</Link>
      </template>
    );

    assert.dom('a').doesNotHaveAttribute('data-external');
  });

  test('external links', async (assert) => {
    await render(
      <template>
        <Link @href="https://gos.si">gossi</Link>
      </template>
    );

    assert.dom('a').hasAttribute('data-external');
  });
});
