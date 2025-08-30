import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Icon } from '#src';
import { IconPageObject } from '#test-support';
import Unicycle from '~icons/custom/unicycle';
import Acorn from '~icons/ph/acorn';
import PulseThin from '~icons/ph/pulse-thin';

module('Rendering | Graphics | <Icon>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(<template><Icon @icon={{Acorn}} /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.dom(icon.$svg).hasAttribute('data-name', 'ph:acorn');
  });

  test('with different style', async (assert) => {
    await render(<template><Icon @icon={{PulseThin}} /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.dom(icon.$svg).hasAttribute('data-name', 'ph:pulse-thin');
  });

  test('with custom icon', async (assert) => {
    await render(<template><Icon @icon={{Unicycle}} /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.dom(icon.$svg).hasAttribute('data-name', 'custom:unicycle');
  });
});
