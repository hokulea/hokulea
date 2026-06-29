import { tracked } from '@glimmer/tracking';
import { render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { RadioButtonGroup } from '#src';
import { RadioButtonGroupPageObject } from '#test-support';

module('Rendering | Actions | <RadioButtonGroup>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><RadioButtonGroup @value="a" /></template>);

    const radioButtonGroup = new RadioButtonGroupPageObject();

    assert.dom(radioButtonGroup).exists();
    assert.dom(radioButtonGroup).hasTagName('div');
    assert.dom(radioButtonGroup).hasAttribute('role', 'radiogroup');
  });

  test('it renders radio buttons', async function (assert) {
    await render(
      <template>
        <RadioButtonGroup @value="a" as |rg|>
          <rg.Button @value="a">Option A</rg.Button>
          <rg.Button @value="b">Option B</rg.Button>
        </RadioButtonGroup>
      </template>
    );

    const radioButtonGroup = new RadioButtonGroupPageObject();

    assert.dom(radioButtonGroup).exists();
    assert.dom(radioButtonGroup.$option).exists({ count: 2 });
    assert.dom(radioButtonGroup.$option[0]).hasText('Option A');
    assert.dom(radioButtonGroup.$option[1]).hasText('Option B');
  });

  module('Selection', function () {
    test('it selects the given value', async function (assert) {
      await render(
        <template>
          <RadioButtonGroup @value="b" as |rg|>
            <rg.Button @value="a">A</rg.Button>
            <rg.Button @value="b">B</rg.Button>
          </RadioButtonGroup>
        </template>
      );

      const radioButtonGroup = new RadioButtonGroupPageObject();

      assert.dom(radioButtonGroup.$option[0]).hasAria('checked', 'false');
      assert.dom(radioButtonGroup.$option[1]).hasAria('checked', 'true');
    });

    test('it triggers @update when clicking an unselected radio', async function (assert) {
      const update = sinon.spy();

      await render(
        <template>
          <RadioButtonGroup @value="a" @update={{update}} as |rg|>
            <rg.Button @value="a">A</rg.Button>
            <rg.Button @value="b">B</rg.Button>
          </RadioButtonGroup>
        </template>
      );

      const radioButtonGroup = new RadioButtonGroupPageObject();

      const radio = radioButtonGroup.$option[1]?.element;

      radio?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      await settled();

      assert.ok(update.calledOnceWith('b'));
    });

    test('@value is reactive', async function (assert) {
      const update = sinon.spy();
      const ctx = new (class {
        // @ts-expect-error known problem, decorators don't work here
        @tracked value: unknown = 'a';
      })();

      await render(
        <template>
          <RadioButtonGroup @value={{ctx.value}} @update={{update}} as |rg|>
            <rg.Button @value="a">A</rg.Button>
            <rg.Button @value="b">B</rg.Button>
          </RadioButtonGroup>
        </template>
      );

      const radioButtonGroup = new RadioButtonGroupPageObject();

      assert.dom(radioButtonGroup.$option[0]).hasAria('checked', 'true');

      ctx.value = 'b';
      await settled();

      assert.dom(radioButtonGroup.$option[0]).hasAria('checked', 'false');
      assert.dom(radioButtonGroup.$option[1]).hasAria('checked', 'true');
      assert.ok(update.calledOnceWith('b'));
    });
  });
});
