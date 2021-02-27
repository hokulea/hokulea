import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';
import { TestContext as BaseTestContext } from 'ember-test-helpers';

import sinon from 'sinon';

import {
  testSelecKeyboardNavigation,
  testSelectKeyboardSelection,
  testSelectKeyboardOpenAndClose
} from '@hokulea/inputs/test-support/a11y';
import { SelectPageObject } from '@hokulea/inputs/test-support/page-objects';

interface TestContext extends BaseTestContext {
  options: string[];
  select: sinon.SinonSpy;
}

module('Rendering | Component | <Select>', hooks => {
  setupRenderingTest(hooks);

  test('it opens', async function (assert) {
    await render(hbs`<Select/>`);
    await SelectPageObject.open();

    assert.dom(SelectPageObject.trigger).hasAria('expanded', 'true');
    assert.dom(SelectPageObject.list).hasStyle({
      opacity: '1'
    });
  });

  module('Single Selection', () => {
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

    test('named blocks are used', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`
        <Select @options={{this.options}}>
          <:placeholder>Please select something</:placeholder>
          <:option as |option|>{{option}}</:option>
          <:selected as |value|>{{value}}</:selected>
        </Select>
      `);
      await SelectPageObject.open();

      assert.dom(SelectPageObject.option).exists({ count: 3 });
    });

    test('options are rendering as is', async function (this: TestContext, assert) {
      this.options = ['apple', 'banana', 'pineapple'];
      await render(hbs`<Select @options={{this.options}}/>`);
      await SelectPageObject.open();

      assert.dom(SelectPageObject.option).exists({ count: 3 });
    });

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
      await testSelecKeyboardNavigation(assert, {
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
  });
});
