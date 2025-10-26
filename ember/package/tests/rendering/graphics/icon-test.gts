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

  test('icon as string', async (assert) => {
    const ListIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
      height="256" data-test="string-icon" viewBox="0 0
      256 256"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1
      0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8
      8 0 0 0 0 16h176a8 8 0 0 0 0-16"/></svg>
    `;

    await render(<template><Icon @icon={{ListIcon}} /></template>);

    const icon = new IconPageObject();

    assert.dom(icon).exists();
    assert.dom(icon.$svg).hasAttribute('data-test', 'string-icon');
  });
});
