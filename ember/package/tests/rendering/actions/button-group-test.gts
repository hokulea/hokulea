import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Button, ButtonGroup } from '#src';
import { ButtonGroupPageObject } from '#test-support';

module('Rendering | Actions | <ButtonGroup>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <ButtonGroup>content</ButtonGroup>
      </template>
    );

    const buttonGroup = new ButtonGroupPageObject();

    assert.dom(buttonGroup).exists();
    assert.dom(buttonGroup).hasTagName('div');
    assert.dom(buttonGroup).hasText('content');
  });

  test('it renders buttons inside the group', async function (assert) {
    await render(
      <template>
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
        </ButtonGroup>
      </template>
    );

    const buttonGroup = new ButtonGroupPageObject();

    assert.dom(buttonGroup).exists();
    assert.dom(buttonGroup.$button).exists({ count: 2 });

    assert.dom(buttonGroup.$button[0]).hasText('First');
    assert.dom(buttonGroup.$button[1]).hasText('Second');
  });
});
