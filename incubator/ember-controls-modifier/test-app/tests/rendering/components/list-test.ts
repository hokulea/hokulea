import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';
import { TestContext as BaseTestContext } from 'ember-test-helpers';

import sinon from 'sinon';

import {
  testListKeyboardNavigation,
  testListKeyboardSelection,
  testListMouseNavigation,
  testListMouseSelection
} from '@hokulea/ember-controls/test-support/a11y';
import { ListPageObject } from '@hokulea/ember-controls/test-support/page-objects';

interface TestContext extends BaseTestContext {
  options: string[];
  select: sinon.SinonSpy;
  value: string;
}

module('Rendering | Component | <List>', hooks => {
  setupRenderingTest(hooks);

  test('it renders properly', async function (assert) {
    await render(hbs`<List/>`);

    assert.dom(ListPageObject.root).exists();
    assert.dom(ListPageObject.root).exists();
    assert.dom(ListPageObject.root).hasAttribute('tabindex', '0');
  });

  test('options are rendering as is', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`<List @options={{this.options}}/>`);

    assert.dom(ListPageObject.option).exists({ count: 3 });
    assert.dom(`${ListPageObject.option}:first-of-type`).hasText('apple');
    assert.dom(`${ListPageObject.option}:nth-of-type(2)`).hasText('banana');
    assert.dom(`${ListPageObject.option}:last-of-type`).hasText('pineapple');
  });

  test('options are rendering using block invocation', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`
      <List @options={{this.options}} as |option|>
        <span data-test-custom-option>➡️ {{option}}</span>
      </List>
    `);

    assert.dom('[data-test-custom-option]').exists({ count: 3 });
    assert.dom(`${ListPageObject.option}:first-of-type`).hasText('➡️ apple');
    assert.dom(`${ListPageObject.option}:nth-of-type(2)`).hasText('➡️ banana');
    assert.dom(`${ListPageObject.option}:last-of-type`).hasText('➡️ pineapple');
  });

  module('Single Selection', () => {
    test('select is invoked', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      this.select = sinon.spy();
      await render(
        hbs`<List @options={{this.options}} @update={{this.select}}/>`
      );
      await ListPageObject.select('apple');

      assert.ok(this.select.calledOnceWith('apple'));
    });

    test('it supports keyboard navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @options={{this.options}}/>`);
      await testListKeyboardNavigation(assert, {
        trigger: ListPageObject.root,
        list: ListPageObject.root
      });
    });

    test('it supports keyboard selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @options={{this.options}}/>`);
      await testListKeyboardSelection(assert, {
        trigger: ListPageObject.root,
        list: ListPageObject.root
      });
    });

    test('it supports mouse navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @options={{this.options}}/>`);
      await testListMouseNavigation(assert, {
        list: ListPageObject.root
      });
    });

    test('it supports mouse selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @options={{this.options}}/>`);
      await testListMouseSelection(assert, {
        list: ListPageObject.root
      });
    });
  });

  module('Multi Selection', () => {
    test('select is invoked', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      this.select = sinon.spy();
      await render(
        hbs`<List @multiple={{true}} @options={{this.options}} @update={{this.select}}/>`
      );
      await ListPageObject.select(['apple']);

      assert.ok(this.select.calledOnceWith(['apple']));
    });

    test('it supports keyboard navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @multiple={{true}} @options={{this.options}}/>`);
      await testListKeyboardNavigation(assert, {
        trigger: ListPageObject.root,
        list: ListPageObject.root
      });
    });

    test('it supports keyboard selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @multiple={{true}} @options={{this.options}}/>`);
      await testListKeyboardSelection(assert, {
        trigger: ListPageObject.root,
        list: ListPageObject.root
      });
    });

    test('it supports mouse navigation', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @multiple={{true}} @options={{this.options}}/>`);
      await testListMouseNavigation(assert, {
        list: ListPageObject.root
      });
    });

    test('it supports mouse selection', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<List @multiple={{true}} @options={{this.options}}/>`);
      await testListMouseSelection(assert, {
        list: ListPageObject.root
      });
    });
  });
});
