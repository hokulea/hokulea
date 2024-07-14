import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Popover } from '@hokulea/ember';

import { PopoverPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Popover>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(
      <template>
        <Popover>Look ma, I am here</Popover>
      </template>
    );

    const icon = new PopoverPageObject();

    assert.dom(icon).exists();
    assert.dom(icon).hasText('Look ma, I am here');
  });
});
