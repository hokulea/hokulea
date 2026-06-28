import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Button, ButtonGroup } from '#src';
import { ButtonGroupPageObject, ButtonPageObject } from '#test-support';

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

  module('Behavior', function () {
    test('it can be disabled', async function (assert) {
      await render(
        <template>
          <ButtonGroup @disabled={{true}}>
            <Button>First</Button>
          </ButtonGroup>
        </template>
      );

      const buttonGroup = new ButtonGroupPageObject();

      assert.dom(buttonGroup).hasAria('disabled', 'true');
    });

    test('it renders buttons that can be clicked', async function (assert) {
      const push = sinon.spy();

      await render(
        <template>
          <ButtonGroup>
            <Button @push={{push}}>Click Me</Button>
          </ButtonGroup>
        </template>
      );

      const button = new ButtonPageObject();

      await button.push();

      assert.ok(push.calledOnce);
    });
  });
});
