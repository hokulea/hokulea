import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';
import { TestContext as BaseTestContext } from 'ember-test-helpers';

import sinon from 'sinon';

import {
  testSelectKeyboardNavigation,
  testSelectKeyboardSelection,
  testSelectKeyboardOpenAndClose,
  testSelectMouseNavigation,
  testSelectMouseSelection
} from '@hokulea/ember-controls/test-support/a11y';
import { SelectPageObject } from '@hokulea/ember-controls/test-support/page-objects';

interface TestContext extends BaseTestContext {
  options: string[];
  select: sinon.SinonSpy;
  value: string;
}

module('Rendering | Component | <Select>', hooks => {
  setupRenderingTest(hooks);

  test('it renders properly', async function (assert) {
    await render(hbs`<Select/>`);

    assert.dom(SelectPageObject.root).exists();
    assert.dom(SelectPageObject.trigger).exists();
    assert.dom(SelectPageObject.trigger).hasAria('expanded', 'false');
    assert.dom(SelectPageObject.list).exists();
    assert.dom(SelectPageObject.list).hasAttribute('tabindex', '-1');
    assert.dom(SelectPageObject.list).hasStyle({
      opacity: '0'
    });
  });

  test('options are rendering as is', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`<Select @options={{this.options}}/>`);

    assert.dom(SelectPageObject.option).exists({ count: 3 });
    assert.dom(`${SelectPageObject.option}:first-of-type`).hasText('apple');
    assert.dom(`${SelectPageObject.option}:nth-of-type(2)`).hasText('banana');
    assert.dom(`${SelectPageObject.option}:last-of-type`).hasText('pineapple');
  });

  test('options are rendering using block invocation', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`
      <Select @options={{this.options}} as |option|>
        <span data-test-custom-option>➡️ {{option}}</span>
      </Select>
    `);

    assert.dom('[data-test-custom-option]').exists({ count: 3 });
    assert.dom(`${SelectPageObject.option}:first-of-type`).hasText('➡️ apple');
    assert
      .dom(`${SelectPageObject.option}:nth-of-type(2)`)
      .hasText('➡️ banana');
    assert
      .dom(`${SelectPageObject.option}:last-of-type`)
      .hasText('➡️ pineapple');
  });

  test('options are rendering using named blocks', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`
      <Select @options={{this.options}} @value={{this.value}}>
        <:placeholder>
          <span data-test-custom-placeholder>Please select something</span>
        </:placeholder>
        <:selected as |value|>
          <span data-test-custom-selected>{{value}}</span>
        </:selected>
        <:option as |option|>
          <span data-test-custom-option>➡️ {{option}}</span>
        </:option>
      </Select>
    `);

    assert
      .dom('[data-test-custom-placeholder]')
      .hasText('Please select something');
    assert.dom('[data-test-custom-option]').exists({ count: 3 });
    assert.dom(`${SelectPageObject.option}:first-of-type`).hasText('➡️ apple');
    assert
      .dom(`${SelectPageObject.option}:nth-of-type(2)`)
      .hasText('➡️ banana');
    assert
      .dom(`${SelectPageObject.option}:last-of-type`)
      .hasText('➡️ pineapple');

    this.set('value', 'banana');
    assert.dom('[data-test-custom-placeholder]').doesNotExist();
    assert.dom('[data-test-custom-selected]').hasText('banana');
  });

  test('it opens', async function (assert) {
    await render(hbs`<Select/>`);
    await SelectPageObject.open();

    assert.dom(SelectPageObject.trigger).hasAria('expanded', 'true');
    assert.dom(SelectPageObject.list).hasStyle({
      opacity: '1'
    });
  });

  module('Single Selection', () => {
    test('select is invoked', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      this.select = sinon.spy();
      await render(
        hbs`<Select @options={{this.options}} @update={{this.select}}/>`
      );
      await SelectPageObject.select('apple');

      assert.ok(this.select.calledOnceWith('apple'));
    });

    test('it supports keyboard controls for open and close', async function (this: TestContext, assert) {
      await render(hbs`<Select/>`);
      await testSelectKeyboardOpenAndClose(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports keyboard navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @options={{this.options}}/>`);
      await testSelectKeyboardNavigation(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports keyboard selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @options={{this.options}}/>`);
      await testSelectKeyboardSelection(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports mouse navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @options={{this.options}}/>`);
      await testSelectMouseNavigation(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports mouse selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @options={{this.options}}/>`);
      await testSelectMouseSelection(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });
  });

  module('Multi Selection', () => {
    test('select is invoked', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      this.select = sinon.spy();
      await render(
        hbs`<Select @multiple={{true}} @options={{this.options}} @update={{this.select}}/>`
      );
      await SelectPageObject.select(['apple']);

      assert.ok(this.select.calledOnceWith(['apple']));
    });

    test('it supports keyboard navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @multiple={{true}} @options={{this.options}}/>`);
      await testSelectKeyboardNavigation(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports keyboard selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @multiple={{true}} @options={{this.options}}/>`);
      await testSelectKeyboardSelection(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports mouse navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @multiple={{true}} @options={{this.options}}/>`);
      await testSelectMouseNavigation(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });

    test('it supports mouse selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @multiple={{true}} @options={{this.options}}/>`);
      await testSelectMouseSelection(assert, {
        trigger: SelectPageObject.trigger,
        list: SelectPageObject.list
      });
    });
  });
});
