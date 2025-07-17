import { tracked } from '@glimmer/tracking';
import { fillIn, render, rerender } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { RangeInput } from '#src';

import { RangeInputPageObject } from '#test-support' ;

module('Rendering | <RangeInput>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><RangeInput /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.dom(input.control).hasAttribute('type', 'range');
  });

  test('it renders additional arguments', async function (assert) {
    await render(<template><RangeInput @orientation="vertical" /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).isNotDisabled();
    assert.strictEqual(input.orientation, 'vertical');
  });

  test('html attributes work', async function (assert) {
    await render(<template><RangeInput min="1" max="10" step="0.5" /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).hasAttribute('min', '1');
    assert.dom(input.control).hasAttribute('max', '10');
    assert.dom(input.control).hasAttribute('step', '0.5');

    await render(<template><RangeInput name="form-name" /></template>);

    assert.dom(input.control).hasAttribute('name', 'form-name');
  });

  test('disabling the input', async function (assert) {
    await render(<template><RangeInput disabled /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).isDisabled();

    await render(<template><RangeInput @disabled={{true}} /></template>);

    assert.dom(input.control).isDisabled();
  });

  test('accepts value', async function (assert) {
    await render(<template><RangeInput @value={{42}} /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).hasValue('42');
  });

  test('triggers @update when value changes', async function (assert) {
    const handleUpdate = sinon.spy();

    await render(<template><RangeInput @value={{42}} @update={{handleUpdate}} /></template>);

    const input = new RangeInputPageObject();

    await fillIn(input, '43');

    assert.ok(handleUpdate.calledWith(43));
  });

  test('@value updates progress style', async function (assert) {
    const context = new (class {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      @tracked value = 40;
    })();

    await render(<template><RangeInput @value={{context.value}} max="100" /></template>);

    const input = new RangeInputPageObject();

    assert.dom(input.control).hasValue('40');
    assert.dom(input.control).hasAttribute('style', '--_hokulea-slider-progress: 40%;');

    context.value = 60;

    await rerender();

    assert.dom(input.control).hasValue('60');
    assert.dom(input.control).hasAttribute('style', '--_hokulea-slider-progress: 60%;');
  });
});
